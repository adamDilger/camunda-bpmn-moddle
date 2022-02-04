'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle = createModdle();

    function read(xml, root, opts) {
      return moddle.fromXML(xml, root, opts);
    }

    function fromFile(file, root, opts) {
      var contents = readFile('test/fixtures/xml/' + file);
      return read(contents, root, opts);
    }


    describe('activiti:historyTimeToLive', function() {

      it('on Process', async function() {

        // given
        var file = 'process-activiti-historyTimeToLive.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          historyTimeToLive : 'foo'
        });
      });

    });


    describe('activiti:isStartableInTasklist', function() {

      it('on Process', async function() {

        // given
        var file = 'process-activiti-isStartableInTasklist.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          isStartableInTasklist : true
        });
      });


      it('default value', function() {

        // when
        var bo = moddle.create('bpmn:Process');

        // then
        expect(bo.get('activiti:isStartableInTasklist')).to.be.true;
      });

    });


    describe('activiti:priority', function() {

      it('on UserTask', async function() {

        // given
        var file = 'userTask-activiti-priority.part.bpmn';

        // when
        var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

        // then
        expect(userTask).to.jsonEqual({
          $type: 'bpmn:UserTask',
          priority: '${ priority }'
        });
      });

    });


    describe('activiti:async', function() {

      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-activiti-async.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          async: true
        });
      });


      it('on SignalEventDefinition', async function() {

        // given
        var file = 'signalEventDefinition-activiti-async.part.bpmn';

        // when
        var { rootElement: signalEventDefinition } = await fromFile(file, 'bpmn:SignalEventDefinition');

        // then
        expect(signalEventDefinition).to.jsonEqual({
          $type: 'bpmn:SignalEventDefinition',
          async: true
        });
      });

    });


    describe('activiti:errorEventDefinition', function() {

      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-activiti-errorEventDefinition.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'activiti:ErrorEventDefinition',
                id: 'Id_1',
                expression: '${true}'
              },
            ],
          },
        }
        );
      });

    });


    describe('activiti:errorCodeVariable', function() {

      it('on ErrorEventDefinition', async function() {

        // given
        var file = 'errorEventDefinition-activiti-errorCodeVariable.part.bpmn';

        // when
        var { rootElement: errorEventDefinition } = await fromFile(file, 'bpmn:ErrorEventDefinition');

        // then
        expect(errorEventDefinition).to.jsonEqual({
          $type: 'bpmn:ErrorEventDefinition',
          errorCodeVariable: 'errorCode'
        });
      });

    });


    describe('activiti:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', async function() {

        // given
        var file = 'escalationEventDefinition-activiti-escalationCodeVariable.part.bpmn';

        // when
        var { rootElement: escalationEventDefinition } = await fromFile(file, 'bpmn:EscalationEventDefinition');

        // then
        expect(escalationEventDefinition).to.jsonEqual({
          $type: 'bpmn:EscalationEventDefinition',
          escalationCodeVariable: 'escalationCode'
        });
      });

    });


    describe('activiti:errorMessage', function() {

      it('on Error', async function() {

        // given
        var file = 'activiti-errorMessage.part.bpmn';

        // when
        var { rootElement: error } = await fromFile(file, 'bpmn:Error');

        // then
        expect(error).to.jsonEqual({
          $type: 'bpmn:Error',
          errorMessage: 'errorMessage'
        });
      });

    });


    it('activiti:script', async function() {

      // given
      var file = 'activiti-script.part.bpmn';

      // when
      var { rootElement: script } = await fromFile(file, 'activiti:Script');

      // then
      expect(script).to.jsonEqual({
        $type: 'activiti:Script',
        scriptFormat: 'groovy',
        resource: 'null',
        value: 'foo = bar;'
      });
    });


    it('activiti:connector', async function() {

      // given
      var file = 'activiti-connector.part.bpmn';

      // when
      var { rootElement: connector } = await fromFile(file, 'activiti:Connector');

      // then
      expect(connector).to.jsonEqual({
        $type: 'activiti:Connector',
        connectorId: 'connector',
        inputOutput: {
          $type: 'activiti:InputOutput',
          inputParameters: [
            {
              $type: 'activiti:InputParameter',
              name: 'in'
            }
          ],
          outputParameters: [
            {
              $type: 'activiti:OutputParameter',
              name: 'out'
            }
          ]
        }
      });
    });


    it('activiti:properties', async function() {

      // given
      var file = 'activiti-properties.part.bpmn';

      // when
      var { rootElement: properties } = await fromFile(file, 'activiti:Properties');

      // then
      expect(properties).to.jsonEqual({
        $type: 'activiti:Properties',
        values: [
          {
            $type: 'activiti:Property',
            id: 'p1',
            name: 'foo',
            value: 'property1'
          }
        ]
      });
    });


    describe('activiti:diagramRelationId', function() {

      it('on Definitions', async function() {

        // given
        var file = 'definitions-diagramRelationId.part.bpmn';

        // when
        var { rootElement: definitions } = await fromFile(file, 'bpmn:Definitions');

        // then
        expect(definitions).to.jsonEqual({
          $type: 'bpmn:Definitions',
          diagramRelationId: 'foo'
        });
      });

    });


    it('activiti:potentialStarter', async function() {

      // given
      var file = 'activiti-potentialStarter.part.bpmn';

      // when
      var { rootElement: starter } = await fromFile(file, 'activiti:PotentialStarter');

      // then
      expect(starter).to.jsonEqual({
        $type: 'activiti:PotentialStarter',
        resourceAssignmentExpression: {
          $type: 'bpmn:ResourceAssignmentExpression',
          expression: {
            $type: 'bpmn:FormalExpression',
            body: 'group2, group(group3), user(user3)'
          }
        }
      });
    });


    describe('activiti:resource', function() {

      it('on FormalExpression', async function() {

        // given
        var file = 'formalExpression-resource.part.bpmn';

        // when
        var { rootElement: expression } = await fromFile(file, 'bpmn:FormalExpression');

        // then
        expect(expression).to.jsonEqual({
          $type: 'bpmn:FormalExpression',
          resource: 'deployment://some-file'
        });
      });

    });


    it('activiti:in', async function() {

      // given
      var file = 'activiti-in.part.bpmn';

      // when
      var { rootElement: binding } = await fromFile(file, 'activiti:In');

      // then
      expect(binding).to.jsonEqual({
        $type: 'activiti:In',
        sourceExpression: 'fooExp',
        source: 'foo',
        target: 'bar',
        variables: 'all',
        local: true
      });
    });


    it('activiti:out', async function() {

      // given
      var file = 'activiti-out.part.bpmn';

      // when
      var { rootElement: binding } = await fromFile(file, 'activiti:Out');

      // then
      expect(binding).to.jsonEqual({
        $type: 'activiti:Out',
        sourceExpression: 'fooExp',
        source: 'foo',
        target: 'bar',
        variables: 'all',
        local: true
      });
    });


    describe('activiti:inputParameter', function() {

      it('with body content', async function() {

        // given
        var file = 'activiti-inputParameter-body.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'activiti:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'activiti:InputParameter',
          name: 'foo',
          value: 'BAR'
        });
      });


      it('with nested script', async function() {

        // given
        var file = 'activiti-inputParameter-script.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'activiti:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'activiti:InputParameter',
          definition: {
            $type: 'activiti:Script'
          }
        });
      });


      it('with nested list', async function() {

        // given
        var file = 'activiti-inputParameter-list.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'activiti:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'activiti:InputParameter',
          name: 'var1',
          definition: {
            $type: 'activiti:List',
            items: [
              {
                $type: 'activiti:Value',
                value: '${1+1}'
              },
              {
                $type: 'activiti:Value',
                value: '${1+2}'
              },
              {
                $type: 'activiti:Value',
                value: '${1+3}'
              }
            ]
          }
        });
      });


      it('with nested map', async function() {

        // given
        var file = 'activiti-inputParameter-map.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'activiti:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'activiti:InputParameter',
          definition: {
            $type: 'activiti:Map',
            entries: [
              {
                $type: 'activiti:Entry',
                key: 'a',
                value: '${1+1}'
              },
              {
                $type: 'activiti:Entry',
                key: 'b',
                value: '${1+2}'
              },
              {
                $type: 'activiti:Entry',
                key: 'c',
                value: '${1+3}'
              }
            ]
          }
        });
      });

    });


    describe('activiti:outputParameter', function() {

      it('with mixed contents', async function() {

        // given
        var file = 'activiti-outputParameter-mixed.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'activiti:OutputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'activiti:OutputParameter',
          name: 'var1',
          definition: {
            $type: 'activiti:List',
            items: [
              {
                $type: 'activiti:Value',
                value: 'constantStringValue'
              },
              {
                $type: 'activiti:Value',
                value: '${ \'elValue\' }'
              },
              {
                $type: 'activiti:Script',
                scriptFormat: 'Groovy',
                value: 'return "scriptValue";'
              }
            ]
          }
        });
      });

    });


    describe('activiti:TemplateSupported', function() {

      describe('activiti:modelerTemplate', function() {

        it('on Process', async function() {

          // given
          var file = 'process-activiti-modelerTemplate.part.bpmn';

          // when
          var { rootElement: process } = await fromFile(file, 'bpmn:Process');

          // then
          expect(process).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo'
          });
        });


        it('on Collaboration', async function() {

          // given
          var file = 'collaboration-activiti-modelerTemplate.part.bpmn';

          // when
          var { rootElement: collaboration } = await fromFile(file, 'bpmn:Collaboration');

          // then
          expect(collaboration).to.jsonEqual({
            $type: 'bpmn:Collaboration',
            modelerTemplate: 'foo'
          });
        });


        it('on Task', async function() {

          // given
          var file = 'task-activiti-modelerTemplate.part.bpmn';

          // when
          var { rootElement: task } = await fromFile(file, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo'
          });
        });


        it('on StartEvent', async function() {

          // given
          var file = 'startEvent-activiti-modelerTemplate.part.bpmn';

          // when
          var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar'
          });
        });

      });


      describe('activiti:modelerTemplateVersion', function() {

        it('on Process', async function() {

          // given
          var file = 'process-activiti-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: process } = await fromFile(file, 'bpmn:Process');

          // then
          expect(process).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });


        it('on Collaboration', async function() {

          // given
          var file = 'collaboration-activiti-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: collaboration } = await fromFile(file, 'bpmn:Collaboration');

          // then
          expect(collaboration).to.jsonEqual({
            $type: 'bpmn:Collaboration',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });


        it('on Task', async function() {

          // given
          var file = 'task-activiti-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: task } = await fromFile(file, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });


        it('on StartEvent', async function() {

          // given
          var file = 'startEvent-activiti-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar',
            modelerTemplateVersion: 1
          });
        });

      });

    });


    describe('activiti:initiator', function() {

      it('on StartEvent', async function() {

        // given
        var file = 'startEvent-activiti-initiator.part.bpmn';

        // when
        var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

        // then
        expect(startEvent).to.jsonEqual({
          $type: 'bpmn:StartEvent',
          initiator: 'kermit'
        });
      });

    });


    it('bpmn:CallActivity', async function() {

      // given
      var file = 'callActivity.part.bpmn';

      // when
      var { rootElement: callActivity } = await fromFile(file, 'bpmn:CallActivity');

      // then
      expect(callActivity).to.jsonEqual({
        $type: 'bpmn:CallActivity',
        calledElementBinding: 'version',
        calledElementVersion: '1',
        calledElementVersionTag: 'version1',
        calledElementTenantId: 'tenant1',
        caseRef: 'oneTaskCase',
        caseBinding: 'version',
        caseVersion: '2',
        caseTenantId: 'tenant1',
        variableMappingClass: 'org.activiti.bpm.test.Test',
        variableMappingDelegateExpression: '${test}'
      });
    });


    describe('activiti:taskPriority', function() {

      it('on Process', async function() {

        // given
        var file = 'process-activiti-taskPriority.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          taskPriority : '100'
        });
      });


      it('on ServiceTaskLike Element', async function() {

        // given
        var file = 'serviceTask-activiti-taskPriority.part.bpmn';

        // when
        var { rootElement: task } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(task).to.jsonEqual({
          $type : 'bpmn:ServiceTask',
          taskPriority : '100'
        });
      });

    });


    describe('activiti:jobPriority', function() {

      it('on Process', async function() {

        // given
        var file = 'process-activiti-jobPriority.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type: 'bpmn:Process',
          jobPriority: '100'
        });
      });


      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-activiti-jobPriority.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          jobPriority: '100'
        });
      });


      it('on Gateway', async function() {

        // given
        var file = 'gateway-activiti-jobPriority.part.bpmn';

        // when
        var { rootElement: gateway } = await fromFile(file, 'bpmn:ExclusiveGateway');

        // then
        expect(gateway).to.jsonEqual({
          $type: 'bpmn:ExclusiveGateway',
          jobPriority: '${ some - expression }'
        });
      });


      it('on Event', async function() {

        // given
        var file = 'event-activiti-jobPriority.part.bpmn';

        // when
        var { rootElement: catchEvent } = await fromFile(file, 'bpmn:IntermediateCatchEvent');

        // then
        expect(catchEvent).to.jsonEqual({
          $type: 'bpmn:IntermediateCatchEvent',
          jobPriority: '100'
        });
      });

    });


    describe('bpmn:Process', function() {

      it('extended with activiti:candidateStarterUsers, activiti:candidateStarterGroups, activiti:versionTag', async function() {

        // given
        var file = 'process.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type: 'bpmn:Process',
          candidateStarterUsers: 'userInGroup2',
          candidateStarterGroups: 'group1, group2, group3',
          versionTag: '1.0.0'
        });
      });

    });


    describe('bpmn:ScriptTask', function() {

      it('extended with activiti:resource, activiti:resultVariable', async function() {

        // given
        var file = 'scriptTask.part.bpmn';

        // when
        var { rootElement: scriptTask } = await fromFile(file, 'bpmn:ScriptTask');

        // then
        expect(scriptTask).to.jsonEqual({
          $type: 'bpmn:ScriptTask',
          scriptFormat: 'python',
          resource: 'some-file.py',
          resultVariable: 'result'
        });
      });

    });


    describe('activiti:executionListener', function() {

      it('attributes', async function() {

        // given
        var file = 'activiti-executionListener.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'activiti:ExecutionListener');

        // then
        expect(executionListener).to.jsonEqual({
          $type: 'activiti:ExecutionListener',
          event: 'start',
          'class': 'my.company.Listener'
        });
      });


      it('script', async function() {

        // given
        var file = 'activiti-executionListener-script.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'activiti:ExecutionListener');

        // then
        expect(executionListener).to.jsonEqual({
          $type: 'activiti:ExecutionListener',
          event: 'start',
          script: {
            $type: 'activiti:Script',
            scriptFormat: 'groovy',
            value: 'foo = bar;'
          }
        });
      });


      it('fields', async function() {

        // given
        var file = 'activiti-executionListener-fields.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'activiti:ExecutionListener');

        // then
        expect(executionListener).to.jsonEqual({
          $type: 'activiti:ExecutionListener',
          event: 'start',
          'class': 'my.company.Listener',
          fields : [
            {
              $type: 'activiti:Field',
              name: 'fieldOne',
              stringValue: 'myString'
            },
            {
              $type: 'activiti:Field',
              name: 'fieldTwo',
              expression: '${myExpression}'
            }
          ]
        });
      });

    });


    describe('activiti:taskListener', function() {

      it('create event', async function() {

        // given
        var file = 'activiti-taskListener.part.bpmn';

        // when
        var { rootElement: taskListener } = await fromFile(file, 'activiti:TaskListener');

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'activiti:TaskListener',
          event: 'create',
          class: 'org.activiti.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: '${myTaskListener}',
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });
      });


      it('timeout event', async function() {

        // given
        var file = 'activiti-timeout-taskListener.part.bpmn';

        // when
        var { rootElement: taskListener } = await fromFile(file, 'activiti:TaskListener');

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'activiti:TaskListener',
          event: 'timeout',
          id: 'timeout-friendly',
          eventDefinitions: [
            {
              $type: 'bpmn:TimerEventDefinition',
              timeDuration: {
                $type: 'bpmn:FormalExpression',
                body: 'PT1H'
              }
            }
          ]
        });
      });

    });


    describe('activiti:field', function() {

      it('attributes', async function() {

        // given
        var file = 'activiti-field-attributes.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'activiti:Field');

        // then
        expect(field).to.jsonEqual({
          $type: 'activiti:Field',
          name: 'html',
          expression: '<html><body>Hi!</body></html>',
          stringValue: '41 is not the answer!'
        });
      });


      it('with nested expression and string', async function() {

        // given
        var file = 'activiti-field-children.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'activiti:Field');

        // then
        expect(field).to.jsonEqual({
          $type: 'activiti:Field',
          name: 'html',
          expression: '<html><body>Hi!</body></html>',
          string: '42 is the answer!'
        });
      });

    });


    describe('activiti:Collectable', function() {

      it('attributes', async function() {

        // given
        var file = 'activiti-multiInstance.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'bpmn:MultiInstanceLoopCharacteristics');

        // then
        expect(field).to.jsonEqual({
          $type: 'bpmn:MultiInstanceLoopCharacteristics',
          isSequential: true,
          collection: '5',
          elementVariable: '5'
        });
      });

    });


    describe('activiti tenant id', function() {

      it('on BusinessRuleTask', async function() {

        // given
        var file = 'businessRuleTask.part.bpmn';

        // when
        var { rootElement: businessRuleTask } = await fromFile(file, 'bpmn:BusinessRuleTask');

        // then
        expect(businessRuleTask).to.jsonEqual({
          $type: 'bpmn:BusinessRuleTask',
          decisionRef: 'myDecision',
          decisionRefBinding: 'version',
          decisionRefVersion: '1',
          decisionRefTenantId: 'tenant1'
        });
      });


      it('on CallActivity', async function() {

        // given
        var file = 'callActivity.part.bpmn';

        // when
        var { rootElement: callActivity } = await fromFile(file, 'bpmn:CallActivity');

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          calledElementBinding: 'version',
          calledElementVersion: '1',
          calledElementVersionTag: 'version1',
          calledElementTenantId: 'tenant1',
          caseRef: 'oneTaskCase',
          caseBinding: 'version',
          caseVersion: '2',
          caseTenantId: 'tenant1',
          variableMappingClass: 'org.activiti.bpm.test.Test',
          variableMappingDelegateExpression: '${test}'
        });
      });

    });


    describe('activiti:errorMessageVariable', function() {

      it('on ErrorEventDefinition', async function() {

        // given
        var file = 'errorEventDefinition-activiti-errorMessageVariable.part.bpmn';

        // when
        var { rootElement: errorEventDefinition } = await fromFile(file, 'bpmn:ErrorEventDefinition');

        // then
        expect(errorEventDefinition).to.jsonEqual({
          $type: 'bpmn:ErrorEventDefinition',
          errorMessageVariable: 'errorMessage'
        });
      });

    });


    describe('activiti:variableName', function() {

      it('on ConditionalEventDefinition', async function() {

        // given
        var file = 'conditionalEventDefinition-activiti-variableName.part.bpmn';

        // when
        var { rootElement: conditionalEventDefinition } = await fromFile(file, 'bpmn:ConditionalEventDefinition');

        // then
        expect(conditionalEventDefinition).to.jsonEqual({
          $type: 'bpmn:ConditionalEventDefinition',
          variableName: 'myConditionVar'
        });
      });

    });


    describe('activiti:variableEvents', function() {

      it('on ConditionalEventDefinition', async function() {

        // given
        var file = 'conditionalEventDefinition-activiti-variableEvents.part.bpmn';

        // when
        var { rootElement: conditionalEventDefinition } = await fromFile(file, 'bpmn:ConditionalEventDefinition');

        // then
        expect(conditionalEventDefinition).to.jsonEqual({
          $type: 'bpmn:ConditionalEventDefinition',
          variableEvents: 'create, update'
        });
      });

    });


    describe('forms', function() {

      describe('embedded/external/Activiti Forms (activiti:formKey)', function() {

        describe('activiti:formKey', function() {

          it('on UserTask', async function() {

            // given
            var file = 'userTask-activiti-formKey.part.bpmn';

            // when
            var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

            // then
            expect(userTask).to.jsonEqual({
              $type: 'bpmn:UserTask',
              formKey: 'form.html'
            });
          });


          it('on StartEvent', async function() {

            // given
            var file = 'startEvent-activiti-formKey.part.bpmn';

            // when
            var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

            // then
            expect(startEvent).to.jsonEqual({
              $type: 'bpmn:StartEvent',
              formKey: 'form.html'
            });
          });

        });

        describe('activiti:formKey and activiti:formHandlerClass', function() {

          it('on UserTask', async function() {

            // given
            var file = 'userTask-activiti-formHandlerClass.part.bpmn';

            // when
            var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

            // then
            expect(userTask).to.jsonEqual({
              $type: 'bpmn:UserTask',
              formHandlerClass: 'my.company.FormHandler',
              formKey: 'form.html'
            });
          });


          it('on StartEvent', async function() {

            // given
            var file = 'startEvent-activiti-formHandlerClass.part.bpmn';

            // when
            var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

            // then
            expect(startEvent).to.jsonEqual({
              $type: 'bpmn:StartEvent',
              formHandlerClass: 'my.company.FormHandler',
              formKey: 'form.html'
            });
          });

        });

      });


      describe('Activiti Forms (activiti:formRef)', function() {

        describe('activiti:formRefBinding = latest', function() {

          it('on UserTask', async function() {

            // given
            var file = 'userTask-activiti-formRef-latest.part.bpmn';

            // when
            var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

            // then
            expect(userTask).to.jsonEqual({
              $type: 'bpmn:UserTask',
              formRef: 'formId',
              formRefBinding: 'latest'
            });
          });


          it('on StartEvent', async function() {

            // given
            var file = 'startEvent-activiti-formRef-latest.part.bpmn';

            // when
            var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

            // then
            expect(startEvent).to.jsonEqual({
              $type: 'bpmn:StartEvent',
              formRef: 'formId',
              formRefBinding: 'latest'
            });
          });

        });


        describe('activiti:formRefBinding = version', function() {

          it('on UserTask', async function() {

            // given
            var file = 'userTask-activiti-formRef-version.part.bpmn';

            // when
            var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

            // then
            expect(userTask).to.jsonEqual({
              $type: 'bpmn:UserTask',
              formRef: 'formId',
              formRefBinding: 'version',
              formRefVersion: '1'
            });
          });


          it('on StartEvent', async function() {

            // given
            var file = 'startEvent-activiti-formRef-version.part.bpmn';

            // when
            var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

            // then
            expect(startEvent).to.jsonEqual({
              $type: 'bpmn:StartEvent',
              formRef: 'formId',
              formRefBinding: 'version',
              formRefVersion: '1'
            });
          });

        });

      });


      describe('generated (activiti:formData)', function() {

        it('activiti:formData', async function() {

          // given
          var file = 'activiti-formData.part.bpmn';

          // when
          var { rootElement: formData } = await fromFile(file, 'activiti:FormData');

          // then
          expect(formData).to.jsonEqual({
            $type: 'activiti:FormData',
            fields: [
              {
                $type: 'activiti:FormField',
                id: 'stringField',
                label: 'String Field',
                type: 'string',
                defaultValue: 'someString',
                properties: {
                  $type: 'activiti:Properties',
                  values: [
                    {
                      $type: 'activiti:Property',
                      id: 'p1',
                      value: 'property1'
                    },
                    {
                      $type: 'activiti:Property',
                      id: 'p2',
                      value: 'property2'
                    }
                  ]
                },
                validation: {
                  $type: 'activiti:Validation',
                  constraints: [
                    {
                      $type: 'activiti:Constraint',
                      name: 'readonly'
                    },
                    {
                      $type: 'activiti:Constraint',
                      name: 'minlength',
                      config: '5'
                    }
                  ]
                },
                values: [
                  {
                    $type: 'activiti:Value',
                    id: 'a',
                    name: 'A'
                  },
                  {
                    $type: 'activiti:Value',
                    id: 'b',
                    name: 'B'
                  }
                ]
              }
            ]
          });
        });


        describe('activiti:formProperty', function() {

          it('attributes', async function() {

            // given
            var file = 'activiti-formProperty-attributes.part.bpmn';

            // when
            var { rootElement: formProperty } = await fromFile(file, 'activiti:FormProperty');

            // then
            expect(formProperty).to.jsonEqual({
              $type: 'activiti:FormProperty',
              id: 'longProperty',
              name: 'Property',
              type: 'long',
              required: 'true',
              readable: 'true',
              writable: 'true',
              variable: 'SpeakerName',
              expression: '#{address.street}',
              datePattern: 'dd-MM-yyyy hh:mm',
              default: '42'
            });
          });


          it('with nested value', async function() {

            // given
            var file = 'activiti-formProperty-children.part.bpmn';

            // when
            var { rootElement: formProperty } = await fromFile(file, 'activiti:FormProperty');

            // then
            expect(formProperty).to.jsonEqual({
              $type: 'activiti:FormProperty',
              values: [
                {
                  $type: 'activiti:Value',
                  id: 'false',
                  name: 'Yes'
                },
                {
                  $type: 'activiti:Value',
                  id: 'true',
                  name: 'No'
                }
              ]
            });
          });

        });

      });

    });

  });

});
