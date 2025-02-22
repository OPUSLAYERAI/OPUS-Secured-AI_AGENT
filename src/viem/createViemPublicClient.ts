import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

export function createViemPublicClient() {
    if (!process.env.SEPOLIA_RPC_URL) {
        throw new Error('SEPOLIA_RPC_URL environment variable is not set')
    }

    return createPublicClient({
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC_URL),
    })
}
