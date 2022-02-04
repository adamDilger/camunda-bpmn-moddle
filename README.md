# activiti-bpmn-moddle

[![CI](https://github.com/activiti/activiti-bpmn-moddle/workflows/CI/badge.svg)](https://github.com/activiti/activiti-bpmn-moddle/actions?query=workflow%3ACI)

This project defines the [Activiti](https://activiti.org) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Activiti BPMN 2.0 extensions.

```javascript
var BpmnModdle = require('bpmn-moddle');

var activitiModdle = require('activiti-bpmn-moddle/resources/activiti');

var moddle = new BpmnModdle({ activiti: activitiModdle });

var serviceTask = moddle.create('bpmn:ServiceTask', {
  'javaDelegate': 'my.company.SomeDelegate'
});
```


## Building the Project

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
npm test
```

Perform a complete build of the application via

```
npm run all
```

## [bpmn-js](https://github.com/bpmn-io/bpmn-js) Extension

We include an extension that makes [bpmn-js](https://github.com/bpmn-io/bpmn-js) Modeler copy and replace mechanisms aware of Activiti properties.

```js
var BpmnJS = require('bpmn-js/lib/Modeler'),
    activitiExtensionModule = require('activiti-bpmn-moddle/lib'),
    activitiModdle = require('activiti-bpmn-moddle/resources/activiti');

var modeler = new BpmnJS({
    additionalModules: [
      activitiExtensionModule
    ],
    moddleExtensions: {
      activiti: activitiModdle
    }
  });
```

This extension hooks into the copy mechanism provided by the BPMN editor and ensures Activiti properties are kept and or dropped on copy and element replace.


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
