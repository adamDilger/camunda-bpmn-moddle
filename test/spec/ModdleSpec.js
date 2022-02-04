'use strict';

var readFile = require('../helper').readFile,
    createModdle = require('../helper').createModdle;

var BpmnModdle = require('bpmn-moddle');

var activitiDescriptor = require('../../resources/activiti');


describe('activiti-bpmn-moddle', function() {

  describe('schema', function() {

    it('should provide model', function() {

      // then
      expect(activitiDescriptor).to.exist;

      expect(activitiDescriptor.uri).to.eql('http://activiti.org/schema/1.0/bpmn');
      expect(activitiDescriptor.prefix).to.eql('activiti');
    });

  });


  describe('behavior', function() {

    it('should extend bpmn-moddle', function() {

      // given
      var moddle = new BpmnModdle({
        activiti: activitiDescriptor
      });

      // when
      var serviceTask = moddle.create('bpmn:ServiceTask');

      // then
      expect(serviceTask.$instanceOf('activiti:ServiceTaskLike')).to.be.true;
    });


    it('should ignore id property on activiti:FormField', async function() {

      var xml = readFile('test/fixtures/xml/activiti-formField-ids.bpmn');

      var moddle = createModdle();

      // when
      var {
        elementsById,
        warnings
      } = await moddle.fromXML(xml, 'bpmn:Definitions');

      // then
      expect(warnings).to.be.empty;
      expect(elementsById).not.to.have.property('variableA');
    });

  });

});