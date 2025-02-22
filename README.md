# ![OPUS Layer Agent](https://github.com/OPUSLAYERAI/OPUS-Secured-AI_AGENT/blob/main/opus-logo.svg)  
**An Example Agent for Sending Transactions Using OPUS Layer**

Welcome to the **OPUS Layer Agent**! This project demonstrates how to implement the OPUS Layer in an agent that securely sends blockchain transactions using natural language processing.

## 🚀 **Features**

- 🔗 **Seamless Transaction Execution:** Send blockchain transactions with simple natural language commands.
- 🤖 **AI-Driven Automation:** Powered by OpenAI for intelligent task management.
- 🔐 **Secure Wallet Integration:** Manage your wallet securely using a private key stored in a `.env` file.
- 🌐 **Direct Integration with OPUS Layer API:** Secure communication with [api.opuslayer.ai](https://docs.opuslayer.ai/development-guide/opus-api).
- 🛠️ **Easy Setup:** Quick installation and straightforward configuration.

## 📦 **Getting Started**

### 1. **Clone the Repository**

```bash
git clone https://github.com/OPUSLAYERAI/OPUS-Secured-AI_AGENT
```

### 2. **Install Dependencies**

Ensure Node.js and NPM are installed, then run:

```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory and add the following keys:

```plaintext
OPENAI_API_KEY=your_openai_api_key
PRIVATE_KEY=your_wallet_private_key
SEPOLIA_RPC_URL=sepolia rpc url (alchemy,infura)
```

> 🔒 **Security Tip:** Keep your private key secure and never commit your `.env` file.


### 4. **Register for the OPUS Layer API**

Before using the agent, you'll need to:

1. **Register for the API:**  
   - Visit [docs.opuslayer.ai](https://docs.opuslayer.ai) to set up your account.  
   - Follow the registration steps to get your **API key**.

2. **Approve USDC for Fee Deduction:**  
   - Approve USDC for API fee deduction on the **OPUS Layer API Reporter Contract**.  
   - Instructions for approval are detailed in the [official documentation](https://docs.opuslayer.ai).


### 5. **Run the Agent**

```bash
npm run start
```

## 🧑‍💻 **Usage**

Once the agent is running, interact using natural language commands like:

- `"Send 0.05 ETH to 0xAbC123..."` – Executes a transaction.
- `"Check my balance"` – Displays wallet balance.
- `"Show recent transactions"` – Lists recent transaction history.

The agent uses the `OPUS Layer API` for transaction execution, as defined in the `src/tools/sendTransaction.ts` file (from **line 124**).


## 🔒 **Security Notice**

This project requires sensitive information like private keys. Always store your `.env` securely and avoid committing it to version control.


## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## 🙌 **Acknowledegments**

- Built with ❤️ using [OpenAI](https://openai.com/), [Node.js](https://nodejs.org/), and [OPUS Layer API](https://api.opuslayer.ai)
- By  [OPUS Layer AI](https://opuslayer.ai)

