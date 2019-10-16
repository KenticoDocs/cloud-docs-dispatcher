| [master](https://github.com/KenticoDocs/kontent-docs-dispatcher/tree/master) | [develop](https://github.com/KenticoDocs/kontent-docs-dispatcher/tree/develop) |
|:---:|:---:|
|[![Build Status](https://travis-ci.com/KenticoDocs/kontent-docs-dispatcher.svg?branch=master)](https://travis-ci.com/KenticoDocs/kontent-docs-dispatcher/branches) [![codebeat badge](https://codebeat.co/badges/2bd543a0-469d-416f-8cac-55b6702408f4)](https://codebeat.co/projects/github-com-kenticodocs-kontent-docs-dispatcher-master) | [![Build Status](https://travis-ci.com/KenticoDocs/kontent-docs-dispatcher.svg?branch=develop)](https://travis-ci.com/KenticoDocs/kontent-docs-dispatcher/branches) [![codebeat badge](https://codebeat.co/badges/0d112750-bba9-404e-93b4-6d95104f6cff)](https://codebeat.co/projects/github-com-kenticodocs-kontent-docs-dispatcher-develop) |

# Kentico Kontent Documentation - Dispatcher

Backend function for Kentico Kontent documentation portal, which utilizes [Kentico Kontent](https://app.kontent.ai/) as a source of its data.

The function responds to webhooks from Kentico Kontent and then notifies [Tutorial Search Service](https://github.com/KenticoDocs/kontent-docs-tutorial-search) and [Reference Preprocessor](https://github.com/KenticoDocs/kontent-docs-reference-preprocessor) about changes in content.

## Overview
1. This project is a TypeScript Azure Functions application.
2. It publishes events to an Azure [Event Grid](https://azure.microsoft.com/en-us/services/event-grid/) topic, where any number of subscribers can listen.
3. Most importantly, the service forwards the type of Kentico Kontent operation along with codenames of the affected content items, so the subscribers can then act accordingly.

## Setup

### Prerequisites
1. Node (+yarn) installed
2. Visual Studio Code installed
3. Subscriptions on MS Azure and Kentico Kontent

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

## Licence
All the source codes are published under MIT licence.
