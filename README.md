[![Build Status](https://travis-ci.org/Kentico/kentico-cloud-docs-webhooks.svg?branch=master)](https://travis-ci.org/Kentico/kentico-cloud-docs-webhooks)
[![codebeat badge](https://codebeat.co/badges/dbbf18e6-89db-4046-89d5-fa5920191169)](https://codebeat.co/projects/github-com-kentico-kentico-cloud-docs-webhooks-master)

# Kentico Cloud Documentation - Webhook Service

Backend service for Kentico Cloud documentation portal, which utilizes [Kentico Cloud](https://app.kenticocloud.com/) as a source of its content.

The service responds to webhooks from Kentico Cloud and notifies [website](https://github.com/Kentico/kentico-cloud-docs-web), [search service](https://github.com/Kentico/kentico-cloud-docs-search) and [API reference service](https://github.com/Kentico/kentico-cloud-docs-api-refs) about changes in content.

## Service Overview
1. The service is written in JavaScript and works as an Azure function that is deployed on Azure as well.
2. It publishes events to an Azure [Event Grid](https://azure.microsoft.com/en-us/services/event-grid/) topic, where any number of subscribers can listen.
3. Most importantly, the service forwards the type of Kentico Cloud webhook operation along with codenames of the affected content items, so the subscribers can then act accordingly

## Service Setup

### Prerequisites
1. Node (+yarn) installed
2. Visual Studio Code installed
3. Subscriptions on MS Azure and Kentico Cloud

### Instructions
1. Open Visual Studio Code and install `vs-code-azurefunctions` extension and `azure-functions-core-tools@core` according to the [following steps](https://code.visualstudio.com/tutorials/functions-extension/getting-started).
2. Log in to the Azure subscription using in an Azure function extensions tab.
3. Clone the project repository and open it in Visual Studio Code.
4. Run `yarn install` in the terminal.
5. Set the required [keys](https://github.com/Kentico/kentico-cloud-docs-search/blob/master/shared/external/keys.js).
6. Deploy to Azure by selecting your subscription in [Azure functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions), or run locally by pressing `Ctrl + F5` in Visual Studio Code.

#### Required Keys
* `EventGrid.DocsChanged.Endpoint` - Event Grid endpoint
* `EventGrid.DocsChanged.Key` - Event Grid topic authentication key

## Testing
* Run `yarn run test` in the terminal.

## How To Contribute
Feel free to open a new issue where you describe your proposed changes, or even create a new pull request from your branch with proposed changes.

## Licence
All the source codes are published under MIT licence.
