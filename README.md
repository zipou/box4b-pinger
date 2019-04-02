# box4b-pinger

## Purpose

Small app to check network status by pinging a list of host from a json file and display it in a simple web page

## Usage

You must have **node** and **yarn** installed on the host.

You must set the JSON file with the list of host to check. There's an example with the file list.json.dist.

For now there's two types of check **ping** and **socket**

After you filled the list, start the app with just `make` which is an alias of `yarn && yarn run start`