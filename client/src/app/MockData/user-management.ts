import { Interfaces } from '../application/interface/interface.service';
import { ModalConfig } from '../application/interface/ui-elements.component';

export const USERMANAGER: Interfaces = {
  id: '1',
  name: 'User Management',
  description: null,
  subject: {
    add: false,
    modal: {},
    id: 'name',
    object: {}
  },
  toolstrip: {
    enable: true,
    save: {
      enable: true
    }
  },
  panels: [],
  data: {}
};
