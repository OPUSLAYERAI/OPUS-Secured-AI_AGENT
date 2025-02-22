import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { eip712WalletActions } from "viem/zksync";

export function createViemWalletClient() {
    if (!process.env.PRIVATE_KEY) {
        console.error("⛔ PRIVATE_KEY environment variable is not set.");
        throw new Error("⛔ PRIVATE_KEY environment variable is not set.");
        
    }

    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

    return createWalletClient({
        account,
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC_URL),
    }).extend(eip712WalletActions());
}
