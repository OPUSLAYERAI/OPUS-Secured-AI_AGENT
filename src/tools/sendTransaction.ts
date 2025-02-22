import axios from 'axios';
import { Address, parseEther, AccessList, keccak256, toBytes } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface SendTransactionArgs {
    explanation: string;
    prompt: string;
    isContract?: string;
    isToken?: string;
    tokenContract?: string;
    to: Address;
    value?: string;
    data?: `0x${string}`;
    nonce?: number;
    gasPrice?: string;
    accessList?: AccessList;
    factoryDeps?: `0x${string}`[];
    paymaster?: Address;
    paymasterInput?: `0x${string}`;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'creates and sends a transaction , note that value is in eth . Write a small explanation of the transaction in the explanation field and the original user prompt for his intentions of the transaction in the prompt field. if no tokenContract is applicable, type in "0x". for isToken and isContract , provide true or false only',
            parameters: {
                type: 'object',
                properties: {
                    explanation: { type: 'string', optional: false },
                    prompt: { type: 'string', optional: false },
                    tokenContract: { type: 'string', optional: false},
                    isToken: { type: 'string', optional: false },
                    isContract: { type: 'string', optional: false },
                    to: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$'
                    },
                    value: { type: 'string', optional: true },
                    data: { type: 'string', pattern: '^0x[a-fA-F0-9]*$', optional: true },
                    nonce: { type: 'number', optional: true },
                    gasPrice: { type: 'string', optional: true },
                    accessList: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                address: { type: 'string' },
                                storageKeys: {
                                    type: 'array',
                                    items: { type: 'string' }
                                }
                            },
                            required: ['address', 'storageKeys']
                        },
                        optional: true
                    },
                    factoryDeps: {
                        type: 'array',
                        items: {
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]*$'
                        },
                        optional: true
                    },
                    paymaster: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        optional: true
                    },
                    paymasterInput: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]*$',
                        optional: true
                    }
                },
                required: ['to']
            }
        }
    },
    handler: async (args) => {
        const result = await createSignedTx(args);
        if (!result.success || !result.hash) throw new Error(result.message);
        return result.hash;
    }
};

async function createSignedTx({
    explanation,
    prompt,
    isContract,     
    isToken,
    tokenContract,
    to,
    value,
    data,
    nonce,
    gasPrice,
    accessList,
    factoryDeps,
    paymaster,
    paymasterInput
}: SendTransactionArgs) {
    try {
        const walletClient = createViemWalletClient();
        const request = await walletClient.prepareTransactionRequest({
            to,
            value: value ? parseEther(value) : undefined,
            data,
            nonce,
            gasPrice: gasPrice ? parseEther(gasPrice) : undefined,
            accessList,
            customData: {
                factoryDeps,
                paymaster,
                paymasterInput
            }
        });
        const rawTx = await walletClient.signTransaction(request);
        console.log(`Transaction signed. Hash: ${rawTx}`);

        const response = await axios.post('https://api.opuslayer.ai/verify', {
            prompt,
            rawTransaction: rawTx,
            explanation,
            isContract,
            isToken,
            tokenContract ,
            model: 'mini'
        });
        console.log(response.data);
        const hashResponse = response.data.transaction_hash;

        return { success: true, hash: hashResponse, message: `result ${response.data}` };
    } catch (error) {
        console.log(`Failed to sign transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return {
            success: false,
            hash: null,
            message: `Failed to sign transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
