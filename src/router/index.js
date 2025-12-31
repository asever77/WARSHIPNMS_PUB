import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // test page
    {
      path: '/guide/',
      name: 'GuideIndex',
      component: () => import('../views/_Guide/Index.vue')
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

      // 대시보드
      children: [{
        path: '/dashboarddefault',
        name: 'DashboardDefaultLayout',
        component: () => import('../layouts/DashboardDefault.vue'),
        meta: { group: 'dashboard' },
        children: [{
          path: '/dashboard/network',
          name: 'DashboardNetworkView',
          component: () => import('../views/Dashboard/Network.vue'),
          meta: { group: 'dashboard' },
        },
        {
          path: '/dashboard/userterminal',
          name: 'DashboardUserterminalView',
          component: () => import('../views/Dashboard/Userterminal.vue'),
          meta: { group: 'dashboard' },
        },
        {
          path: '/dashboard/receptacleunit',
          name: 'DashboardReceptacleunitView',
          component: () => import('../views/Dashboard/Receptacleunit.vue'),
          meta: { group: 'dashboard' },
        },
        {
          path: '/dashboard/rack',
          name: 'DashboardRackView',
          component: () => import('../views/Dashboard/Rack.vue'),
          meta: { group: 'dashboard' },
        },
        {
          path: '/dashboard/activealarm',
          name: 'DashboardActivealarmView',
          component: () => import('../views/Dashboard/Activealarm.vue'),
          meta: { group: 'dashboard' },
        }],
      },

      // 설정/단말관리
      {
        path: '/settingsdevicemanagedefault',
        name: 'SettingsDevicemanageDefaultLayout',
        component: () => import('../layouts/SettingsDevicemanageDefault.vue'),
        meta: { group: 'settings' },
        children: [{
          path: '/settings/devicemanage/userterminal',
          name: 'SettingsDevicemanageUserterminalView',
          component: () => import('../views/Settings/Devicemanage/Userterminal.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/devicemanage/receptacleunit',
          name: 'SettingsDevicemanageReceptacleunitView',
          component: () => import('../views/Settings/Devicemanage/Receptacleunit.vue'),
          meta: { group: 'settings' },
        }],
      },
      // 설정/연결설정관리/보안장비연동장치
      {
        path: '/settingsconnectconfigmanagedefault',
        name: 'SettingsConnectconfigmanageDefaultLayout',
        component: () => import('../layouts/SettingsConnectconfigmanageDefault.vue'),
        meta: { group: 'settings' },
        children: [
          {
            path: '/settings/connectconfigmanage/interlockdevice/service',
            name: 'SettingsConnectconfigmanageInterlockdeviceView',
            component: () => import('../layouts/SettingsConnectconfigmanageDefaultInner.vue'),
            meta: { group: 'settings' },
            children: [
              {
                path: '/settings/connectconfigmanage/interlockdevice/service',
                name: 'SettingsConnectconfigmanageInterlockdeviceServiceView',
                component: () => import('../views/Settings/Connectconfigmanage/Interlockdevice/ServicePage.vue'),
                meta: { group: 'settings' },
              },
              {
                path: '/settings/connectconfigmanage/interlockdevice/port',
                name: 'SettingsConnectconfigmanageInterlockdevicePortView',
                component: () => import('../views/Settings/Connectconfigmanage/Interlockdevice/PortPage.vue'),
                meta: { group: 'settings' },
              },
            ]
          },
          // 설정/연결설정관리/보안장비연동장치
          {
            path: '/settings/connectconfigmanage/wirelesslink/service',
            name: 'SettingsConnectconfigmanageWirelesslinkView',
            component: () => import('../layouts/SettingsConnectconfigmanageDefaultInner2.vue'),
            meta: { group: 'settings' },
            children: [
              {
                path: '/settings/connectconfigmanage/wirelesslink/service',
                name: 'SettingsConnectconfigmanageWirelesslinkServiceView',
                component: () => import('../views/Settings/Connectconfigmanage/Wirelesslink/ServicePage.vue'),
                meta: { group: 'settings' },
              },
              {
                path: '/settings/connectconfigmanage/wirelesslink/port',
                name: 'SettingsConnectconfigmanageWirelesslinkPortView',
                component: () => import('../views/Settings/Connectconfigmanage/Wirelesslink/PortPage.vue'),
                meta: { group: 'settings' },
              },
            ]
          },
          {
            path: '/settings/connectconfigmanage/repeater/service',
            name: 'SettingsConnectconfigmanageRepeaterView',
            component: () => import('../layouts/SettingsConnectconfigmanageDefaultInner3.vue'),
            meta: { group: 'settings' },
            children: [
              {
                path: '/settings/connectconfigmanage/repeater/port',
                name: 'SettingsConnectconfigmanageRepeaterPortView',
                component: () => import('../views/Settings/Connectconfigmanage/Repeater/PortPage.vue'),
                meta: { group: 'settings' },
              },
            ]
          },
          {
            path: '/settings/connectconfigmanage/etc/port',
            name: 'SettingsConnectconfigmanageEtcView',
            component: () => import('../layouts/SettingsConnectconfigmanageDefaultInner4.vue'),
            meta: { group: 'settings' },
            children: [
              {
                path: '/settings/connectconfigmanage/etc/port',
                name: 'SettingsConnectconfigmanageEtcPortView',
                component: () => import('../views/Settings/Connectconfigmanage/Etc/PortPage.vue'),
                meta: { group: 'settings' },
              },
            ]
          },
          // 전문처리장치 관련 화면은 일단 보류
          // {
          //   path: '/settings/connectconfigmanage/wirelesschannelbond',
          //   name: 'SettingsConnectconfigmanageWirelesschannelbondView',
          //   component: () => import('../views/Settings/Connectconfigmanage/Wirelesschannelbond.vue'),
          //   meta: { group: 'settings' },
          // }
        ],
      },
      {
        path: '/settingscallmanagedefault',
        name: 'SettingsCallmanageDefaultLayout',
        component: () => import('../layouts/SettingsCallmanageDefault.vue'),
        meta: { group: 'settings' },
        children: [{
          path: '/settings/callmanage/membermanage',
          name: 'SettingsCallmanageMembermanageView',
          component: () => import('../views/Settings/Callmanage/Membermanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/callmanage/meetingcallmanage',
          name: 'SettingsCallmanageMeetingcallmanageView',
          component: () => import('../views/Settings/Callmanage/Meetingcallmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/callmanage/groupcallmanage',
          name: 'SettingsCallmanageGroupcallmanageView',
          component: () => import('../views/Settings/Callmanage/Groupcallmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/callmanage/dscpmanage',
          name: 'SettingsCallmanageDscpmanageView',
          component: () => import('../views/Settings/Callmanage/Dscpmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/callmanage/otherSystem',
          name: 'SettingsCallmanageOtherSystemView',
          component: () => import('../views/Settings/Callmanage/OtherSystem.vue'),
          meta: { group: 'settings' },
        }],
      },
      {
        path: '/settingsexternallinkagemanagedefault',
        name: 'SettingsExternallinkagemanageDefaultLayout',
        component: () => import('../layouts/SettingsExternallinkagemanageDefault.vue'),
        meta: { group: 'settings' },
        children: [
          {
            path: '/settings/externallinkagemanage/broadcastequipmanage',
            name: 'SettingsExternallinkagemanageBroadcastequipmanageView',
            component: () => import('../views/Settings/Externallinkagemanage/Broadcastequipmanage.vue'),
            meta: { group: 'settings' },
          },
          {
            path: '/settings/externallinkagemanage/alarmdevicemanage',
            name: 'SettingsExternallinkagemanageAlarmdevicemanageView',
            component: () => import('../views/Settings/Externallinkagemanage/Alarmdevicemanage.vue'),
            meta: { group: 'settings' },
          },
          {
            path: '/settings/externallinkagemanage/cctvmanage',
            name: 'SettingsExternallinkagemanageCctvmanageView',
            component: () => import('../views/Settings/Externallinkagemanage/Cctvmanage.vue'),
            meta: { group: 'settings' },
          },
        ],
      },
      {
        path: '/settingsoperationconfigmanagedefault',
        name: 'SettingsOperationconfigmanageDefaultLayout',
        component: () => import('../layouts/SettingsOperationconfigmanageDefault.vue'),
        meta: { group: 'settings' },
        children: [{
          path: '/settings/operationconfigmanage/operationconfigbackup',
          name: 'SettingsOperationconfigmanageOperationconfigbackupView',
          component: () => import('../views/Settings/Operationconfigmanage/Operationconfigbackup.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/operationconfigmanage/operationconfigrestore',
          name: 'SettingsOperationconfigmanageOperationconfigrestoreView',
          component: () => import('../views/Settings/Operationconfigmanage/Operationconfigrestore.vue'),
          meta: { group: 'settings' },
        }],
      },
      {
        path: '/settingsequipmanagedefault',
        name: 'SettingsEquipmanageDefaultLayout',
        component: () => import('../layouts/SettingsEquipmanageDefault.vue'),
        meta: { group: 'settings' },
        children: [{
          path: '/settings/equipmanage/devicemanage',
          name: 'SettingsEquipmanageDevicemanageView',
          component: () => import('../views/Settings/Equipmanage/Devicemanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/equipmanage/terminalboxmanage',
          name: 'SettingsEquipmanageTerminalboxmanageView',
          component: () => import('../views/Settings/Equipmanage/Terminalboxmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/equipmanage/rackmanage',
          name: 'SettingsEquipmanageRackmanageView',
          component: () => import('../views/Settings/Equipmanage/Rackmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/equipmanage/modelmanage',
          name: 'SettingsEquipmanageModelmanageView',
          component: () => import('../views/Settings/Equipmanage/Modelmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/equipmanage/frequencymanage',
          name: 'SettingsEquipmanageFrequencymanageView',
          component: () => import('../views/Settings/Equipmanage/Frequencymanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/equipmanage/wirelesscommunicatebond',
          name: 'SettingsEquipmanageWirelesscommunicatebondView',
          component: () => import('../views/Settings/Equipmanage/Wirelesscommunicatebond.vue'),
          meta: { group: 'settings' },
        }],
      },
      {
        path: '/settingsplanmanagedefault',
        name: 'SettingsPlanmanageDefaultLayout',
        component: () => import('../layouts/SettingsPlanmanageDefault.vue'),
        meta: { group: 'settings' },
        children: [{
          path: '/settings/planmanage/drawingmanage',
          name: 'SettingsPlanmanageDrawingmanageView',
          component: () => import('../views/Settings/Planmanage/Drawingmanage.vue'),
          meta: { group: 'settings' },
        },
        {
          path: '/settings/planmanage/areamanage',
          name: 'SettingsPlanmanageAreamanageView',
          component: () => import('../views/Settings/Planmanage/Areamanage.vue'),
          meta: { group: 'settings' },
        }],
      },

      // 통화연결설정
      {
        path: '/callconnectconfigdefault',
        name: 'CallconnectconfigDefaultLayout',
        component: () => import('../layouts/CallconnectconfigDefault.vue'),
        meta: { group: 'callconnectconfig' },
        children: [{
          path: '/callconnectconfig/pointtopoint',
          name: 'CallconnectconfigPointtopointView',
          component: () => import('../views/Callconnectconfig/Pointtopoint.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/meetingcall',
          name: 'CallconnectconfigMeetingcallView',
          component: () => import('../views/Callconnectconfig/Meetingcall.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/groupcall',
          name: 'CallconnectconfigGroupcallView',
          component: () => import('../views/Callconnectconfig/Groupcall.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/wirelessequip',
          name: 'CallconnectconfigWirelessequipView',
          component: () => import('../views/Callconnectconfig/Wirelessequip.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/broadcastequip',
          name: 'CallconnectconfigBroadcastequipView',
          component: () => import('../views/Callconnectconfig/Broadcastequip.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/alarm',
          name: 'CallconnectconfigAlarmView',
          component: () => import('../views/Callconnectconfig/Alarm.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/cctv',
          name: 'CallconnectconfigCctvView',
          component: () => import('../views/Callconnectconfig/Cctv.vue'),
          meta: { group: 'callconnectconfig' },
        },
        {
          path: '/callconnectconfig/wireless',
          name: 'CallconnectconfigWirelessView',
          component: () => import('../views/Callconnectconfig/Wireless.vue'),
          meta: { group: 'callconnectconfig' },
        }],
      },

      // 녹음관리
      {
        path: '/recordingmanagementdefault',
        name: 'RecordingmanagementDefaultLayout',
        component: () => import('../layouts/RecordingmanagementDefault.vue'),
        meta: { group: 'recording' },
        children: [{
          path: '/recording/othersystemrecording/setting',
          name: 'RecordingmanagementSettingView',
          component: () => import('../views/Recording/Recordingmanagement/Setting.vue'),
          meta: { group: 'recording' },
        },
        {
          path: '/recording/othersystemrecording/targetmanagement',
          name: 'RecordingmanagementTargetmanagementView',
          component: () => import('../views/Recording/Recordingmanagement/Targetmanagement.vue'),
          meta: { group: 'recording' },
        }],
      },

      // 장치운영
      {
        path: '/deviceoperationdefault',
        name: 'DeviceoperationDefaultLayout',
        component: () => import('../layouts/DeviceoperationDefault.vue'),
        meta: { group: 'deviceoperation' },
        children: [{
          path: '/deviceoperation/firmwaremanage',
          name: 'DeviceoperationFirmwaremanageView',
          component: () => import('../views/Deviceoperation/Firmwaremanage.vue'),
          meta: { group: 'deviceoperation' },
        },
        {
          path: '/deviceoperation/firmwareupgrade',
          name: 'DeviceoperationFirmwareupgradeView',
          component: () => import('../views/Deviceoperation/Firmwareupgrade.vue'),
          meta: { group: 'deviceoperation' },
        },
        {
          path: '/deviceoperation/devicecontrol',
          name: 'DeviceoperationDevicecontrolView',
          component: () => import('../views/Deviceoperation/Devicecontrol.vue'),
          meta: { group: 'deviceoperation' },
        },
        {
          path: '/deviceoperation/lightcontrol',
          name: 'DeviceoperationLightcontrolView',
          component: () => import('../views/Deviceoperation/Lightcontrol.vue'),
          meta: { group: 'deviceoperation' },
        },
        {
          path: '/deviceoperation/resultinquiry',
          name: 'DeviceoperationResultinquiryView',
          component: () => import('../views/Deviceoperation/Resultinquiry.vue'),
          meta: { group: 'deviceoperation' },
        }],
      },

      // 문서관리
      {
        path: '/documentmanagdefault',
        name: 'DocumentmanageDefaultLayout',
        component: () => import('../layouts/DocumentmanageDefault.vue'),
        meta: { group: 'documentmanage' },
        children: [{
          path: '/documentmanage/manual',
          name: 'DocumentmanageManualView',
          component: () => import('../views/Documentmanage/Manual.vue'),
          meta: { group: 'documentmanage' },
        }],
      },

      // 사용자관리
      {
        path: '/usermanagdefault',
        name: 'UsermanageDefaultLayout',
        component: () => import('../layouts/UsermanageDefault.vue'),
        meta: { group: 'usermanage' },
        children: [{
          path: '/usermanage/accountmanage',
          name: 'UsermanageAccountmanageView',
          component: () => import('../views/Usermanage/Accountmanage.vue'),
          meta: { group: 'usermanage' },
        },
        {
          path: '/usermanage/permissionmanage',
          name: 'UsermanagePermissionmanageView',
          component: () => import('../views/Usermanage/Permissionmanage.vue'),
          meta: { group: 'usermanage' },
        },
        {
          path: '/usermanage/changepassword',
          name: 'UsermanageChangepasswordView',
          component: () => import('../views/Usermanage/Changepassword.vue'),
          meta: { group: 'usermanage' },
        },
        {
          path: '/usermanage/shortcutconfig',
          name: 'UsermanageShortcutconfigView',
          component: () => import('../views/Usermanage/Shortcutconfig.vue'),
          meta: { group: 'usermanage' },
        }],
      },

      // 통계
      {
        path: '/statisticsdefault',
        name: 'StatisticsDefaultLayout',
        component: () => import('../layouts/StatisticsDefault.vue'),
        meta: { group: 'statistics' },
        children: [{
          path: '/statistics/manual',
          name: 'StatisticsManualView',
          component: () => import('../views/Statistics/Manual.vue'),
          meta: { group: 'statistics' },
        }],
      },

      //이력
      {
        path: '/recorddefault',
        name: 'RecordDefaultLayout',
        component: () => import('../layouts/RecordDefault.vue'),
        meta: { group: 'record' },
        children: [{
          path: '/record/callrecord',
          name: 'RecordCallrecordView',
          component: () => import('../views/Record/Callrecord.vue'),
          meta: { group: 'record' },
        },
        {
          path: '/record/alarmrecord',
          name: 'RecordAlarmrecordView',
          component: () => import('../views/Record/Alarmrecord.vue'),
          meta: { group: 'record' },
        },
        {
          path: '/record/changerecord',
          name: 'RecordChangerecordView',
          component: () => import('../views/Record/Changerecord.vue'),
          meta: { group: 'record' },
        }],
      }
      ]
    }
  ],
})

export default router
