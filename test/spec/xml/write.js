'use strict';

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }


  describe('should export types', function() {

    it('Field#stringValue', async function() {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        stringValue: 'myFieldValue'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/schema/1.0/bpmn" ' +
              'name="Field_1" stringValue="myFieldValue" />';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('Field#string', async function() {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        string: 'myStringValue'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/schema/1.0/bpmn" name="Field_1">' +
          '<activiti:string>myStringValue</activiti:string>' +
        '</activiti:field>';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('Field#expression', async function() {

      // given
      var fieldElem = moddle.create('activiti:Field', {
        name: 'Field_1',
        expression: '${myExpressionValue}'
      });

      var expectedXML =
        '<activiti:field xmlns:activiti="http://activiti.org/schema/1.0/bpmn" name="Field_1">' +
          '<activiti:expression>${myExpressionValue}</activiti:expression>' +
        '</activiti:field>';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('UserTask#formRefBinding', async function() {

      // given
      var element = moddle.create('bpmn:UserTask', {
        'activiti:formRefBinding': 'latest'
      });

      var expectedXML =
        '<bpmn:userTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                       'xmlns:activiti="http://activiti.org/schema/1.0/bpmn" ' +
                       'activiti:formRefBinding="latest" />';

      // when
      var { xml } = await write(element);

      // then
      expect(xml).to.eql(expectedXML);
    });

  });

});
