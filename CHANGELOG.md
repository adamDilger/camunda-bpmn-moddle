# Changelog

All notable changes to [activiti-bpmn-moddle](https://github.com/activiti/activiti-bpmn-moddle) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 6.1.1

* `FIX`: remove invalid `activiti:formRefBinding` default value ([#87](https://github.com/activiti/activiti-bpmn-moddle/pull/87))

## 6.1.0

* `FEAT`: remove `variableEvents` for `startEvent` outside of `EventSubProcess` ([#77](https://github.com/activiti/activiti-bpmn-moddle/pull/77))
* `FIX`: remove `initiator` property for `shape.create` ([#78](https://github.com/activiti/activiti-bpmn-moddle/pull/78))

## 6.0.0

* `FEAT`: support `activiti:formRef`, `activiti:formRefBinding` and `activiti:formRefVersion` elements ([#76](https://github.com/activiti/activiti-bpmn-moddle/pull/76))
* `FIX`: remove `initiator` property for `startEvent` when moved to a subProcess ([#74](https://github.com/activiti/activiti-bpmn-moddle/issues/74))

## 5.1.2

* `FIX`: ensure root element is referenced on correct position ([#70](https://github.com/activiti/activiti-bpmn-moddle/pull/70))

## 5.1.1

* `FIX`: do not copy non existing root elements ([#69](https://github.com/activiti/activiti-bpmn-moddle/pull/69))

## 5.1.0

* `FEAT`: add behavior to copy and paste `bpmn:Error` elements referenced via `activiti:ErrorEventDefinition` elements ([#68](https://github.com/activiti/activiti-bpmn-moddle/pull/68))
* `FIX`: support `activiti:modelerTemplate` and `activiti:modelerTemplateVersion` for `bpmn:Collaboration` elements ([#67](https://github.com/activiti/activiti-bpmn-moddle/pull/67))

## 5.0.0

* `CHORE`: rename `*EventDefinition` to `*EventDefinitionExtension`
* `FEAT`: support `activiti:ErrorEventDefinition` for external service tasks

### Breaking Changes

* `*EventDefinition` elements were re-named by appending `Extension`. Adjust the name of these elements, if you extended or superclassed them.

## 4.5.0

* `FIX`: add `modelerTemplateVersion` property ([#60](https://github.com/activiti/activiti-bpmn-moddle/pull/60))

## 4.4.1

* `FIX`: rename `variableEvent` to `variableEvents` ([`cd4a417`](https://github.com/activiti/activiti-bpmn-moddle/commit/cd4a417c1ee7831646f896d2360854aee7ee1ad3))

## 4.4.0

* `FEAT`: copy [`activiti:in`](https://docs.activiti.org/manual/7.12/reference/bpmn20/custom-extensions/extension-elements/#in) on signal throw events ([#54](https://github.com/activiti/activiti-bpmn-moddle/pull/54))

## 4.3.0

* `FEAT`: add `id` and `eventDefinitions` to task listener schema ([`9668525f`](https://github.com/activiti/activiti-bpmn-moddle/commit/9668525f217df6938312e84bde0f022115ea5935))

## 4.2.0

* `FEAT`: add `activiti:diagramRelationId` to schema ([#49](https://github.com/activiti/activiti-bpmn-moddle/issues/49))

## 4.1.2

* `FIX`: do not copy `activiti:InputOutput` on gateways
* `FIX`: copy `activiti:FailedJobRetryTimeCycle` consistently for all `activiti:AsyncCapable` elements

## 4.1.1

* `FIX`: allow [`activiti:failedJobRetryTimeCycle`](https://docs.activiti.org/manual/7.11/reference/bpmn20/custom-extensions/extension-elements/#failedjobretrytimecycle) in `bpmn:SubProcess`
* `FIX`: allow [`activiti:executionListener`](https://docs.activiti.org/manual/7.11/reference/bpmn20/custom-extensions/extension-elements/#executionlistener) in `bpmn:Process`

## 4.1.0

* `FEAT`: add `activiti:errorMessage` to schema ([`d47da`](https://github.com/activiti/activiti-bpmn-moddle/commit/d47da3a8e90b90994fd397c3ddb6572ce6dcbc1c))

## 4.0.1

* `DOCS`: update bpmn-js integration docs

## 4.0.0

* `CHORE`: update moddle copy mechanism for compatibility with `bpmn-js@5`
* `CHORE`: use Activiti logical types in `allowedIn` mappings
* `FIX`: make extension work

### Breaking Changes

* Requires `bpmn-js@5+` for proper copying of moddle attributes

## 3.2.0

* `FEAT`: add `activiti:calledElementVersionTag` to schema ([#43](https://github.com/activiti/activiti-bpmn-moddle/issues/43))

## 3.1.1

* `FIX`: correct `activiti:isStartableInTasklist` default value ([#41](https://github.com/activiti/activiti-bpmn-moddle/issues/41))

## 3.1.0

* `FEAT`: support `activiti:isStartableInTasklist`

## ...

Check `git log` for earlier history.
