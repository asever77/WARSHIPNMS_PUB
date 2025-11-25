import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    // test page 
    {
      path: '/guide/',
      name: 'GuideIndex',
      component: () => import('../views/_Guide/index.vue')
    },
    {
      path: '/guide/tabs',
      name: 'TabsView',
      component: () => import('../views/_Guide/Tabs.vue')
    },
    {
      path: '/guide/modal',
      name: 'ModalView',
      component: () => import('../views/_Guide/Modal.vue')
    },
    {
      path: '/guide/accordion',
      name: 'AccordionView',
      component: () => import('../views/_Guide/Accordion.vue')
    },
    {
      path: '/guide/dropdowns',
      name: 'DropdownsView',
      component: () => import('../views/_Guide/Dropdowns.vue')
    },
    {
      path: '/guide/toasts',
      name: 'ToastsView',
      component: () => import('../views/_Guide/Toasts.vue')
    },
    {
      path: '/guide/tooltips',
      name: 'TooltipsView',
      component: () => import('../views/_Guide/Tooltips.vue')
    },
    {
      path: '/guide/form',
      name: 'FormView',
      component: () => import('../views/_Guide/Form.vue')
    },
    {
      path: '/guide/table',
      name: 'TableView',
      component: () => import('../views/_Guide/Table.vue')
    },

    {
      path: '/tree',
      name: 'TreeView',
      component: () => import('../views/TreeView.vue')
    },
    {
      path: '/tree',
      name: 'TreeView',
      component: () => import('../views/TreeView.vue')
    },
    {
      path: '/basicfunctions',
      name: 'BasicFunctionsView',
      component: () => import('../views/BasicFunctions.vue')
    },
    {
      path: '/',
      name: 'LoginView',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/default',
      name: 'DefaultLayout',
      component: () => import('../layouts/Default.vue'),
      children: [{
        path: '/dashboarddefault',
        name: 'DashboardDefaultLayout',
        component: () => import('../layouts/DashboardDefault.vue'),
        children: [{
          path: '/dashboard/network',
          name: 'DashboardNetworkView',
          component: () => import('../views/Dashboard/Network.vue')
        },
        {
          path: '/dashboard/userterminal',
          name: 'DashboardUserterminalView',
          component: () => import('../views/Dashboard/Userterminal.vue')
        },
        {
          path: '/dashboard/receptacleunit',
          name: 'DashboardReceptacleunitView',
          component: () => import('../views/Dashboard/Receptacleunit.vue')
        },
        {
          path: '/dashboard/rack',
          name: 'DashboardRackView',
          component: () => import('../views/Dashboard/Rack.vue')
        },
        {
          path: '/dashboard/activealarm',
          name: 'DashboardActivealarmView',
          component: () => import('../views/Dashboard/Activealarm.vue')
        }],
      },
      {
        path: '/settingsdevicemanagedefault',
        name: 'SettingsDevicemanageDefaultLayout',
        component: () => import('../layouts/SettingsDevicemanageDefault.vue'),
        children: [{
          path: '/settings/devicemanage/userterminal',
          name: 'SettingsDevicemanageUserterminalView',
          component: () => import('../views/Settings/Devicemanage/Userterminal.vue')
        },
        {
          path: '/settings/devicemanage/receptacleunit',
          name: 'SettingsDevicemanageReceptacleunitView',
          component: () => import('../views/Settings/Devicemanage/Receptacleunit.vue')
        }],
      },
      {
        path: '/settingsconnectconfigmanagedefault',
        name: 'SettingsConnectconfigmanageDefaultLayout',
        component: () => import('../layouts/SettingsConnectconfigmanageDefault.vue'),
        children: [{
          path: '/settings/connectconfigmanage/specialprocessunit',
          name: 'SettingsConnectconfigmanageSpecialprocessunitView',
          component: () => import('../views/Settings/Connectconfigmanage/Specialprocessunit.vue')
        },
        {
          path: '/settings/connectconfigmanage/interlockdevice',
          name: 'SettingsConnectconfigmanageInterlockdeviceView',
          component: () => import('../views/Settings/Connectconfigmanage/Interlockdevice.vue')
        },
        {
          path: '/settings/connectconfigmanage/wirelesslink',
          name: 'SettingsConnectconfigmanageWirelesslinkView',
          component: () => import('../views/Settings/Connectconfigmanage/Wirelesslink.vue')
        },
        {
          path: '/settings/connectconfigmanage/repeater',
          name: 'SettingsConnectconfigmanageRepeaterView',
          component: () => import('../views/Settings/Connectconfigmanage/Repeater.vue')
        },
        {
          path: '/settings/connectconfigmanage/etc',
          name: 'SettingsConnectconfigmanageEtcView',
          component: () => import('../views/Settings/Connectconfigmanage/Etc.vue')
        },
        {
          path: '/settings/connectconfigmanage/wirelesschannelbond',
          name: 'SettingsConnectconfigmanageWirelesschannelbondView',
          component: () => import('../views/Settings/Connectconfigmanage/Wirelesschannelbond.vue')
        }],
      },
      {
        path: '/settingscallmanagedefault',
        name: 'SettingsCallmanageDefaultLayout',
        component: () => import('../layouts/SettingsCallmanageDefault.vue'),
        children: [{
          path: '/settings/callmanage/membermanage',
          name: 'SettingsCallmanageMembermanageView',
          component: () => import('../views/Settings/Callmanage/Membermanage.vue')
        },
        {
          path: '/settings/callmanage/meetingcallmanage',
          name: 'SettingsCallmanageMeetingcallmanageView',
          component: () => import('../views/Settings/Callmanage/Meetingcallmanage.vue')
        },
        {
          path: '/settings/callmanage/groupcallmanage',
          name: 'SettingsCallmanageGroupcallmanageView',
          component: () => import('../views/Settings/Callmanage/Groupcallmanage.vue')
        },
        {
          path: '/settings/callmanage/dscpmanage',
          name: 'SettingsCallmanageDscpmanageView',
          component: () => import('../views/Settings/Callmanage/Dscpmanage.vue')
        }],
      },
      {
        path: '/settingsexternallinkagemanagedefault',
        name: 'SettingsExternallinkagemanageDefaultLayout',
        component: () => import('../layouts/SettingsExternallinkagemanageDefault.vue'),
        children: [{
          path: '/settings/externallinkagemanage/broadcastequipmanage',
          name: 'SettingsExternallinkagemanageBroadcastequipmanageView',
          component: () => import('../views/Settings/Externallinkagemanage/Broadcastequipmanage.vue')
        },
        {
          path: '/settings/externallinkagemanage/alarmdevicemanage',
          name: 'SettingsExternallinkagemanageAlarmdevicemanageView',
          component: () => import('../views/Settings/Externallinkagemanage/Alarmdevicemanage.vue')
        }],
      },
      {
        path: '/settingsoperationconfigmanagedefault',
        name: 'SettingsOperationconfigmanageDefaultLayout',
        component: () => import('../layouts/SettingsOperationconfigmanageDefault.vue'),
        children: [{
            path: '/settings/operationconfigmanage/operationconfigbackup',
            name: 'SettingsOperationconfigmanageOperationconfigbackupView',
            component: () => import('../views/Settings/Operationconfigmanage/Operationconfigbackup.vue')
          },
          {
            path: '/settings/operationconfigmanage/operationconfigrestore',
            name: 'SettingsOperationconfigmanageOperationconfigrestoreView',
            component: () => import('../views/Settings/Operationconfigmanage/Operationconfigrestore.vue')
          }],
      },
      {
        path: '/settingsequipmanagedefault',
        name: 'SettingsEquipmanageDefaultLayout',
        component: () => import('../layouts/SettingsEquipmanageDefault.vue'),
        children: [{
          path: '/settings/equipmanage/devicemanage',
          name: 'SettingsEquipmanageDevicemanageView',
          component: () => import('../views/Settings/Equipmanage/Devicemanage.vue')
        },
        {
          path: '/settings/equipmanage/terminalboxmanage',
          name: 'SettingsEquipmanageTerminalboxmanageView',
          component: () => import('../views/Settings/Equipmanage/Terminalboxmanage.vue')
        },
        {
          path: '/settings/equipmanage/rackmanage',
          name: 'SettingsEquipmanageRackmanageView',
          component: () => import('../views/Settings/Equipmanage/Rackmanage.vue')
        },
        {
          path: '/settings/equipmanage/modelmanage',
          name: 'SettingsEquipmanageModelmanageView',
          component: () => import('../views/Settings/Equipmanage/Modelmanage.vue')
        },
        {
          path: '/settings/equipmanage/frequencymanage',
          name: 'SettingsEquipmanageFrequencymanageView',
          component: () => import('../views/Settings/Equipmanage/Frequencymanage.vue')
        },
        {
          path: '/settings/equipmanage/wirelesscommunicatebond',
          name: 'SettingsEquipmanageWirelesscommunicatebondView',
          component: () => import('../views/Settings/Equipmanage/Wirelesscommunicatebond.vue')
        }],
      },
      {
        path: '/settingsplanmanagedefault',
        name: 'SettingsPlanmanageDefaultLayout',
        component: () => import('../layouts/SettingsPlanmanageDefault.vue'),
        children: [{
          path: '/settings/planmanage/drawingmanage',
          name: 'SettingsPlanmanageDrawingmanageView',
          component: () => import('../views/Settings/Planmanage/Drawingmanage.vue')
        },
        {
          path: '/settings/planmanage/areamanage',
          name: 'SettingsPlanmanageAreamanageView',
          component: () => import('../views/Settings/Planmanage/Areamanage.vue')
        }],
      },
      {
        path: '/callconnectconfigdefault',
        name: 'CallconnectconfigDefaultLayout',
        component: () => import('../layouts/CallconnectconfigDefault.vue'),
        children: [{
          path: '/callconnectconfig/pointtopoint',
          name: 'CallconnectconfigPointtopointView',
          component: () => import('../views/Callconnectconfig/Pointtopoint.vue')
        },
        {
          path: '/callconnectconfig/meetingcall',
          name: 'CallconnectconfigMeetingcallView',
          component: () => import('../views/Callconnectconfig/Meetingcall.vue')
        },
        {
          path: '/callconnectconfig/groupcall',
          name: 'CallconnectconfigGroupcallView',
          component: () => import('../views/Callconnectconfig/Groupcall.vue')
        },
        {
          path: '/callconnectconfig/wirelessequip',
          name: 'CallconnectconfigWirelessequipView',
          component: () => import('../views/Callconnectconfig/Wirelessequip.vue')
        },
        {
          path: '/callconnectconfig/broadcastequip',
          name: 'CallconnectconfigBroadcastequipView',
          component: () => import('../views/Callconnectconfig/Broadcastequip.vue')
        },
        {
          path: '/callconnectconfig/alarm',
          name: 'CallconnectconfigAlarmView',
          component: () => import('../views/Callconnectconfig/Alarm.vue')
        },
        {
          path: '/callconnectconfig/wireless',
          name: 'CallconnectconfigWirelessView',
          component: () => import('../views/Callconnectconfig/Wireless.vue')
        }],
      },
      {
        path: '/deviceoperationdefault',
        name: 'DeviceoperationDefaultLayout',
        component: () => import('../layouts/DeviceoperationDefault.vue'),
        children: [{
          path: '/deviceoperation/firmwaremanage',
          name: 'DeviceoperationFirmwaremanageView',
          component: () => import('../views/Deviceoperation/Firmwaremanage.vue')
        },
        {
          path: '/deviceoperation/firmwareupgrade',
          name: 'DeviceoperationFirmwareupgradeView',
          component: () => import('../views/Deviceoperation/Firmwareupgrade.vue')
        },
        {
          path: '/deviceoperation/devicecontrol',
          name: 'DeviceoperationDevicecontrolView',
          component: () => import('../views/Deviceoperation/Devicecontrol.vue')
        },
        {
          path: '/deviceoperation/resultinquiry',
          name: 'DeviceoperationResultinquiryView',
          component: () => import('../views/Deviceoperation/Resultinquiry.vue')
        }],
      },
      {
        path: '/documentmanagdefault',
        name: 'DocumentmanageDefaultLayout',
        component: () => import('../layouts/DocumentmanageDefault.vue'),
        children: [{
          path: '/documentmanage/manual',
          name: 'DocumentmanageManualView',
          component: () => import('../views/Documentmanage/Manual.vue')
        }],
      },
      {
        path: '/usermanagdefault',
        name: 'UsermanageDefaultLayout',
        component: () => import('../layouts/UsermanageDefault.vue'),
        children: [{
          path: '/usermanage/accountmanage',
          name: 'UsermanageAccountmanageView',
          component: () => import('../views/Usermanage/Accountmanage.vue')
        },
        {
          path: '/usermanage/permissionmanage',
          name: 'UsermanagePermissionmanageView',
          component: () => import('../views/Usermanage/Permissionmanage.vue')
        },
        {
          path: '/usermanage/changepassword',
          name: 'UsermanageChangepasswordView',
          component: () => import('../views/Usermanage/Changepassword.vue')
        },
        {
          path: '/usermanage/shortcutconfig',
          name: 'UsermanageShortcutconfigView',
          component: () => import('../views/Usermanage/Shortcutconfig.vue')
        }],
      },
      {
        path: '/recorddefault',
        name: 'RecordDefaultLayout',
        component: () => import('../layouts/RecordDefault.vue'),
        children: [{
          path: '/record/callrecord',
          name: 'RecordCallrecordView',
          component: () => import('../views/Record/Callrecord.vue')
        },
        {
          path: '/record/alarmrecord',
          name: 'RecordAlarmrecordView',
          component: () => import('../views/Record/Alarmrecord.vue')
        },
        {
          path: '/record/changerecord',
          name: 'RecordChangerecordView',
          component: () => import('../views/Record/Changerecord.vue')
        }],
      }
      ]
    }
  ],
})

export default router
