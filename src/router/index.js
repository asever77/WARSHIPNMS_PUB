import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/default',
    name: 'DefaultLayout',
    component: () => import('@/layouts/Default.vue'),
    children: [{
      path: '/dashboard/network',
      name: 'DashboardNetworkView',
      component: () => import('@/views/Dashboard/Network.vue')
    },
    {
      path: '/dashboard/userterminal',
      name: 'DashboardUserterminalView',
      component: () => import('@/views/Dashboard/Userterminal.vue')
    },
    {
      path: '/dashboard/receptacleunit',
      name: 'DashboardReceptacleunitView',
      component: () => import('@/views/Dashboard/Receptacleunit.vue')
    },
    {
      path: '/dashboard/rack',
      name: 'DashboardRackView',
      component: () => import('@/views/Dashboard/Rack.vue')
    },
    {
      path: '/dashboard/activealarm',
      name: 'DashboardActivealarmView',
      component: () => import('@/views/Dashboard/Activealarm.vue')
    },
    {
      path: '/settings/devicemanage/userterminal',
      name: 'SettingsDevicemanageUserterminalView',
      component: () => import('@/views/Settings/Devicemanage/Userterminal.vue')
    },
    {
      path: '/settings/devicemanage/receptacleunit',
      name: 'SettingsDevicemanageReceptacleunitView',
      component: () => import('@/views/Settings/Devicemanage/Receptacleunit.vue')
    },
    {
      path: '/settings/connectconfigmanage/specialprocessunit',
      name: 'SettingsConnectconfigmanageSpecialprocessunitView',
      component: () => import('@/views/Settings/Connectconfigmanage/Specialprocessunit.vue')
    },
    {
      path: '/settings/connectconfigmanage/interlockdevice',
      name: 'SettingsConnectconfigmanageInterlockdeviceView',
      component: () => import('@/views/Settings/Connectconfigmanage/Interlockdevice.vue')
    },
    {
      path: '/settings/connectconfigmanage/wirelesslink',
      name: 'SettingsConnectconfigmanageWirelesslinkView',
      component: () => import('@/views/Settings/Connectconfigmanage/Wirelesslink.vue')
    },
    {
      path: '/settings/connectconfigmanage/repeater',
      name: 'SettingsConnectconfigmanageRepeaterView',
      component: () => import('@/views/Settings/Connectconfigmanage/Repeater.vue')
    },
    {
      path: '/settings/connectconfigmanage/etc',
      name: 'SettingsConnectconfigmanageEtcView',
      component: () => import('@/views/Settings/Connectconfigmanage/Etc.vue')
    },
    {
      path: '/settings/connectconfigmanage/wirelesschannelbond',
      name: 'SettingsConnectconfigmanageWirelesschannelbondView',
      component: () => import('@/views/Settings/Connectconfigmanage/Wirelesschannelbond.vue')
    },
    {
      path: '/settings/callmanage/membermanage',
      name: 'SettingsCallmanageMembermanageView',
      component: () => import('@/views/Settings/Callmanage/Membermanage.vue')
    },
    {
      path: '/settings/callmanage/meetingcallmanage',
      name: 'SettingsCallmanageMeetingcallmanageView',
      component: () => import('@/views/Settings/Callmanage/Meetingcallmanage.vue')
    },
    {
      path: '/settings/callmanage/groupcallmanage',
      name: 'SettingsCallmanageGroupcallmanageView',
      component: () => import('@/views/Settings/Callmanage/Groupcallmanage.vue')
    },
    {
      path: '/settings/callmanage/dscpmanage',
      name: 'SettingsCallmanageDscpmanageView',
      component: () => import('@/views/Settings/Callmanage/Dscpmanage.vue')
    },
    {
      path: '/settings/externallinkagemanage/broadcastequipmanage',
      name: 'SettingsExternallinkagemanageBroadcastequipmanageView',
      component: () => import('@/views/Settings/Externallinkagemanage/Broadcastequipmanage.vue')
    },
    {
      path: '/settings/externallinkagemanage/alarmdevicemanage',
      name: 'SettingsExternallinkagemanageAlarmdevicemanageView',
      component: () => import('@/views/Settings/Externallinkagemanage/Alarmdevicemanage.vue')
    },
    {
      path: '/settings/operationconfigmanage/operationconfigbackup',
      name: 'SettingsOperationconfigmanageOperationconfigbackupView',
      component: () => import('@/views/Settings/Operationconfigmanage/Operationconfigbackup.vue')
    },
    {
      path: '/settings/operationconfigmanage/operationconfigrestore',
      name: 'SettingsOperationconfigmanageOperationconfigrestoreView',
      component: () => import('@/views/Settings/Operationconfigmanage/Operationconfigrestore.vue')
    },
    {
      path: '/settings/equipmanage/devicemanage',
      name: 'SettingsEquipmanageDevicemanageView',
      component: () => import('@/views/Settings/Equipmanage/Devicemanage.vue')
    },
    {
      path: '/settings/equipmanage/terminalboxmanage',
      name: 'SettingsEquipmanageTerminalboxmanageView',
      component: () => import('@/views/Settings/Equipmanage/Terminalboxmanage.vue')
    },
    {
      path: '/settings/equipmanage/rackmanage',
      name: 'SettingsEquipmanageRackmanageView',
      component: () => import('@/views/Settings/Equipmanage/Rackmanage.vue')
    },
    {
      path: '/settings/equipmanage/modelmanage',
      name: 'SettingsEquipmanageModelmanageView',
      component: () => import('@/views/Settings/Equipmanage/Modelmanage.vue')
    },
    {
      path: '/settings/equipmanage/frequencymanage',
      name: 'SettingsEquipmanageFrequencymanageView',
      component: () => import('@/views/Settings/Equipmanage/Frequencymanage.vue')
    },
    {
      path: '/settings/equipmanage/wirelesscommunicatebond',
      name: 'SettingsEquipmanageWirelesscommunicatebondView',
      component: () => import('@/views/Settings/Equipmanage/Wirelesscommunicatebond.vue')
    },
    {
      path: '/settings/planmanage/drawingmanage',
      name: 'SettingsPlanmanageDrawingmanageView',
      component: () => import('@/views/Settings/Planmanage/Drawingmanage.vue')
    },
    {
      path: '/settings/planmanage/areamanage',
      name: 'SettingsPlanmanageAreamanageView',
      component: () => import('@/views/Settings/Planmanage/Areamanage.vue')
    },
    {
      path: '/callconnectconfig/pointtopoint',
      name: 'CallconnectconfigPointtopointView',
      component: () => import('@/views/Callconnectconfig/Pointtopoint.vue')
    },
    {
      path: '/callconnectconfig/meetingcall',
      name: 'CallconnectconfigMeetingcallView',
      component: () => import('@/views/Callconnectconfig/Meetingcall.vue')
    },
    {
      path: '/callconnectconfig/groupcall',
      name: 'CallconnectconfigGroupcallView',
      component: () => import('@/views/Callconnectconfig/Groupcall.vue')
    },
    {
      path: '/callconnectconfig/wirelessequip',
      name: 'CallconnectconfigWirelessequipView',
      component: () => import('@/views/Callconnectconfig/Wirelessequip.vue')
    },
    {
      path: '/callconnectconfig/broadcastequip',
      name: 'CallconnectconfigBroadcastequipView',
      component: () => import('@/views/Callconnectconfig/Broadcastequip.vue')
    },
    {
      path: '/callconnectconfig/alarm',
      name: 'CallconnectconfigAlarmView',
      component: () => import('@/views/Callconnectconfig/Alarm.vue')
    },
    {
      path: '/callconnectconfig/wireless',
      name: 'CallconnectconfigWirelessView',
      component: () => import('@/views/Callconnectconfig/Wireless.vue')
    },
    {
      path: '/deviceoperation/firmwaremanage',
      name: 'DeviceoperationFirmwaremanageView',
      component: () => import('@/views/Deviceoperation/Firmwaremanage.vue')
    },
    {
      path: '/deviceoperation/firmwareupgrade',
      name: 'DeviceoperationFirmwareupgradeView',
      component: () => import('@/views/Deviceoperation/Firmwareupgrade.vue')
    },
    {
      path: '/deviceoperation/devicecontrol',
      name: 'DeviceoperationDevicecontrolView',
      component: () => import('@/views/Deviceoperation/Devicecontrol.vue')
    },
    {
      path: '/deviceoperation/resultinquiry',
      name: 'DeviceoperationResultinquiryView',
      component: () => import('@/views/Deviceoperation/Resultinquiry.vue')
    },
    {
      path: '/documentmanage/manual',
      name: 'DocumentmanageManualView',
      component: () => import('@/views/Documentmanage/Manual.vue')
    },
    {
      path: '/usermanage/accountmanage',
      name: 'UsermanageAccountmanageView',
      component: () => import('@/views/Usermanage/Accountmanage.vue')
    },
    {
      path: '/usermanage/permissionmanage',
      name: 'UsermanagePermissionmanageView',
      component: () => import('@/views/Usermanage/Permissionmanage.vue')
    },
    {
      path: '/usermanage/changepassword',
      name: 'UsermanageChangepasswordView',
      component: () => import('@/views/Usermanage/Changepassword.vue')
    },
    {
      path: '/usermanage/shortcutconfig',
      name: 'UsermanageShortcutconfigView',
      component: () => import('@/views/Usermanage/Shortcutconfig.vue')
    },
    {
      path: '/record/callrecord',
      name: 'RecordCallrecordView',
      component: () => import('@/views/Record/Callrecord.vue')
    },
    {
      path: '/record/alarmrecord',
      name: 'RecordAlarmrecordView',
      component: () => import('@/views/Record/Alarmrecord.vue')
    },
    {
      path: '/record/changerecord',
      name: 'RecordChangerecordView',
      component: () => import('@/views/Record/Changerecord.vue')
    }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
