'use strict';

module.exports = {
  __init__: [
    'activitiCopyPasteBehavior',
    'activitiCopyPasteRootElementBehavior',
    'activitiRemoveInitiatorBehaviour',
    'activitiRemoveVariableEventBehaviour'
  ],
  activitiCopyPasteBehavior: [ 'type', require('./CopyPasteBehavior') ],
  activitiCopyPasteRootElementBehavior: [ 'type', require('./CopyPasteRootElementBehavior') ],
  activitiRemoveInitiatorBehaviour: ['type', require('./RemoveInitiatorBehaviour') ],
  activitiRemoveVariableEventBehaviour: ['type', require('./RemoveVariableEventBehaviour') ]

};
