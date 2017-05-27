# Lights app - RPi

# Introduction 

This project is a React UI application and mainly use:
* `Express Framework`
* `React js`
* `React Bootstrap`
* `webpack`
* `Ajax` 

Through the data communication `json` with the `Connect API`, realize the remote controll of the system.

# Run the application
cd -> `/src` and run `node app.js`

On the Browser side, type the address `http://localhost:3020`.

**Note: maybe you need to install additional plugins, wenn you download this project to your owner PC, 
Enter just like `npm install promise` in the appropriate folder on the command line**

# Project Folder Structure

After you download this Project, your project should look like this:
```
lightapp/
  node_modules/
  package.json
  README.md
  startServer.js
  stopServer.js
  update-and-restart.js
  src/
    client/                           -- react ui components and boostrap resource
    configuration/                    -- config global json
    controllers/                      -- conmmunication controller with Connect API
    public/                           -- root html web file and resource
    routers/                          -- Express router path
    app.js                            -- Start entry
    R.js                              -- Utils
```

You can find the source HTML file in the `public` folder of the generated project. You may edit the `<title>` tag in it to change the title from “Light Contrllerp” to anything else.

**Note that normally you wouldn’t edit files in the `public` folder very often. For example, [adding a stylesheet](#adding-a-stylesheet) is done without touching the HTML.**

# React Component in the App 

* `Light APP Management`. --root element
* `Lights UI Framework`.  --Subassemblies

**Note: in the future development you can add more `sub-Components` to mount on the root element`(Light App Management)`, Through the `React Router Component` to select the components your need**

## Light APP Management

For example:`light app management`

includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```
npm install --save <library-name>
```
encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead using `require()` and `module.exports`.
```js
import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
```

```js
render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h3>Welcome to Light APP Management</h3>
                </div>
                <p className="App-intro">
                    <code>select application</code>
                </p>
                <div>
                    <Button bsStyle="success" onClick={this.handleClick}>Light UI DashBoard</Button>
                </div>

            </div>
        );
    }
    ...
```

`this is the final effect:`

![screeshot](https://bytebucket.org/ertecotechnologies/lightapp/raw/24a0a313e3b9bad7558068c6d28ebc59d63825e8/img/DashBoard.PNG?token=b4521535afa8d31af7a0f944d4053ae7223de47a)



## Lights UI Framework
For example: `Lights` and `Light` Component
```js
 render() {
        if (!this.state)
            return null;
        var content = this.generateLights();
        return (
            <div className="page-lights">
                <div className="contentWrapper">{content}</div>
            </div>
        );
    }
```
**Node：According to the returned JSON result，get the information of lights of each group, and generate the corresponding React UI Component**

`Group Information: [{"G01","G02","G03"}]`

`Lights Information in each group:`
*  `[{"ID":"L01","dimm":0,"BDADDR":"00130418ccd2"}]`
*  `[{"ID":"L02","dimm":0,"BDADDR":"00130418cc94"}]`
*  `[{"ID":"L03","dimm":0,"BDADDR":"00130418cd31"}]`

```js
  generateLights() {
        var groupLights = this.state.groupLights;
        return groupLights.map(function (light) {
            return <Light light={light} />
        });

    }
```

 `This is the final effect:`
![screeshot](https://bytebucket.org/ertecotechnologies/lightapp/raw/24a0a313e3b9bad7558068c6d28ebc59d63825e8/img/Lights.PNG?token=90cce37598291be3678060584b17f17a25a0c6bb)

## Navigation bar and 5 Sub react ui components
* `Password Setting`
* `Light ID Assignment`
* `Group Assignment`
* `Scene Setting`
* `Sequence Setting`

![navigation](https://bytebucket.org/ertecotechnologies/lightapp/raw/24a0a313e3b9bad7558068c6d28ebc59d63825e8/img/Navigation.PNG?token=4069448dc4ed27abba5c6bc2faf14d34189eb278)

## React Flux Model
it uses a one way data stream to combine te react view component in React. 

![](https://bytebucket.org/ertecotechnologies/lightapp/raw/24a0a313e3b9bad7558068c6d28ebc59d63825e8/img/Flux.PNG?token=2cb4f408f8ff2fe6cdf95a4f991357aca520cd3c)

* `dispatcher` : Event dispatch center, the hub of the flux model and manage all the data stream in the UI Component in React. It's essentially the callback and resgistration of the store's(`LightsAction`). Every Store registers itself and provides a callback function. Wenn the Dispatcher responds to the Action, the data load provided by the Action will be sent to all the stores in the application via the registered callback function. 
* `store` : 
  - store is where the only data in the application changes
  - contains all the data that is applied
  - store is where the only data in the application changes
  - all data changes are sent by the dispatcher to the store, no assignment interface
  - the new data is passed back to the view with the change event triggered by the Store.
  - store only exposed getter, not allowed to provide setter
  - it is forbidden to operate the Store directly from anywhere
```js
 handleActions(action) {
        switch (action.type) {

            case "RECEIVE_GROUPS":
                {
                    if (action.groups) {
                        this.groups = action.groups;
                        this.emit("changeGroups");
                    }
                    break;
                }


            case "RECEIVE_GROUPLIGHTS":
                {
                    if (action.groupLights) {
                        this.lights = action.groupLights;
                        this.emit("changeGroupLights");
                    }
                    break;
                }

            case "BLINK_EVENT":
                {
                    if (action.blinkInfo) {
                        this.blinkRes = action.blinkInfo;
                        this.emit("blinkEvent");
                    }
                    break;
                }

            case "DIMM_EVENT":
                {
                    if (action.dimmRes) {
                        this.dimmRes = action.dimmRes;
                        this.emit("dimmEvent");
                    }
                    break;
                }

            case "PASSWORD_EVENT":
                {
                    if (action.pwRes) {
                        this.pwRes = action.pwRes;
                        this.emit("passwordEvent");
                    }
                    break;
                }

            case "IDENTIFICATION_EVENT":
                {
                    if (action.identificationRes) {
                        this.identificationRes = action.identificationRes;
                        this.emit("identificationResEvent");
                    }
                    break;
                }


            case "GROUPHANDLE_EVENT":
                {
                    if (action.groupHandleRes) {
                        this.groupHandleRes = action.groupHandleRes;
                        this.emit("groupHandleResEvent");
                    }
                    break;
                }

            case "SCENEHANDLE_EVENT":
                {
                    if (action.sceneHandleRes) {
                        this.sceneHandleRes = action.sceneHandleRes;
                        this.emit("sceneHandleResEvent");
                    }
                    break;
                }

            case "SEQUENCEHANDLE_EVENT":
                {
                    if (action.sequenceHandleRes) {
                        this.sequenceHandleRes = action.sequenceHandleRes;
                        this.emit("sequenceHandleResEvent");
                    }
                    break;
                }

        }
```
* `view` :
  - ui-component Responsibility Single
  - only the action trigger event is allowed
  - the data is passed from the upper container through the attribute.
* `action` :

one example for Group Polling Command
```js
export function pollGroups() {
    console.log("poll all group!");
    var apiUrl = "/lights/pollgroups/"
    $.ajax({
        method: 'GET',
        url: apiUrl,
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json'
    }).done(groups => {
        console.log("ajax: groups:" + groups);
        dispatcher.dispatch({
            type: 'RECEIVE_GROUPS',
            groups: groups
        });
    })
        .fail(jqXhr => {
            console.log("poll all group: ajax request error: " + JSON.stringify(jqXhr));
        });

}
```
  How Flux(Unidirectional Data Flow) Works:

![](https://bytebucket.org/ertecotechnologies/lightapp/raw/24a0a313e3b9bad7558068c6d28ebc59d63825e8/img/FluxWork.PNG?token=a41398167a1212b603c0ec6824d6cb881cd47cc7)

## Navigation bar click event handling

* `Position: LoadingButton.js`

**Note: All the data collected from UI will be further processed into json data and sent through ajax to the server**
```js
handleClick() {
        ...
        switch (this.props.clickCommand.command) {
            case "password_remote":
                ...
                LightsActions.passwordSetting(data);
                break;
            case "password_local":
                ...
                LightsActions.passwordSetting(data);
                break;

            case "identification_assign":
                ...
                LightsActions.handleIdentification(data);
                break;

            case "group_assign":
                ...
                LightsActions.groupHandle(data);
                break;
            case "group_delete":
                ...
                LightsActions.groupHandle(data);
                break;

            case "scene_save":
                ...
                LightsActions.sceneHandle(data);
                break;

            case "scene":
                ...
                LightsActions.sceneHandle(data);
                break;

            case "delete_scene":
                ...
                LightsActions.sceneHandle(data);
                break;

            case "get_scene":
                ...
                LightsActions.sceneHandle(data);
                break;

            case "sequenceControl_save":
                ...
                LightsActions.sequenceHandle(data);
                break;
            case "sequenceControl_start":
                ...
                LightsActions.sequenceHandle(data);
                break;
            case "sequenceControl_stop":
                ...
                LightsActions.sequenceHandle(data);
                break;
        }
    }
```

