| [master](https://github.com/Kontent-ai-Learn/kontent-ai-learn-dispatcher/tree/master) | [develop](https://github.com/Kontent-ai-Learn/kontent-ai-learn-dispatcher/tree/develop) |
|:---:|:---:|
|![master](https://github.com/Kontent-ai-Learn/kontent-ai-learn-dispatcher/actions/workflows/master_kcd-webhook-service-live-master.yml/badge.svg) | ![develop](https://github.com/Kontent-ai-Learn/kontent-ai-learn-dispatcher/actions/workflows/develop_kcd-webhook-service-live-dev.yml/badge.svg) |

# Kontent.ai Learn - Dispatcher

Backend function for Kontent.ai Learn that fetches content from [Kontent.ai](https://kontent.ai/).

The function responds to webhooks from Kontent.ai and then notifies [Tutorial Search Service](https://github.com/Kontent-ai-Learn/kontent-ai-learn-tutorial-search) and [Reference Preprocessor](https://github.com/Kontent-ai-Learn/kontent-ai-learn-reference-preprocessor) about changes in content.

## Overview

1. This project is a TypeScript Azure Functions application.
2. It publishes events to an Azure [Event Grid](https://azure.microsoft.com/en-us/services/event-grid/) topic, where any number of subscribers can listen.
3. Most importantly, the service forwards the type of Kontent.ai operation along with codenames of the affected content items, so the subscribers can then act accordingly.

## Setup

### Prerequisites

1. Node (+yarn) installed
2. Visual Studio Code installed
3. Subscriptions on MS Azure and Kontent.ai

### Instructions

1. Open Visual Studio Code and install the prerequisites according to the [following steps](https://code.visualstudio.com/tutorials/functions-extension/getting-started).
2. Log in to Azure using the Azure Functions extension tab.
3. Clone the project repository and open it in Visual Studio Code.
4. Run `yarn install` in the terminal.
5. Set the required keys.
6. Deploy to Azure using Azure Functions extension tab, or run locally by pressing `Ctrl + F5` in Visual Studio Code.

#### Required Keys

* `EventGrid.DocsChanged.Endpoint` - Event Grid endpoint
* `EventGrid.DocsChanged.Key` - Event Grid topic authentication key

## Testing

* Run `yarn run test` in the terminal.

## How To Contribute

Feel free to open a new issue where you describe your proposed changes, or even create a new pull request from your branch with proposed changes.

## License

All the source codes are published under MIT license.
