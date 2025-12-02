<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 13rem" />
      <col style="width: 16.5rem" />
      <col style="width: 13rem" />
      <col style="width: 16.5rem" />
      <col style="width: 13rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          {{ lang.filterDeviceType }}
          <BButton class="btn-sort" aria-sort="none" :aria-label="`${lang.filterDeviceType} 전체 정렬`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">{{ lang.filterSearchTarget }}
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterSearchTarget} 전체 정렬`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">{{ lang.filterSearchWord }}</th>
        <td>
          <BFormInput id="search-word" class="ui-input" v-model="searchWord" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.filterRegDate }}
          <BButton class="btn-sort" aria-sort="ascending" :aria-label="`${lang.filterRegDate} 전체 정렬`"></BButton>
        </th>
        <td colspan="5">
          <div class="ui-flex" data-item-align="center" data-gap="4" style="width: 20rem;">
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              v-model="regDateStart"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
              v-model="regDateEnd"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btnSearch }}</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup :label="lang.searchLabel" label-for="search-word-2">
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="검색" @click="onFilter" />
          </div>
        </BFormGroup>

        <BFormSelect
            id="per-page"
            class="ui-select-28 w-60"
            v-model="perPage"
            :options="perPageOptions"
          ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
        <template #head(select)>
          <BFormCheckbox
            :indeterminate="isIndeterminate"
            :model-value="isAllSelected"
            @update:modelValue="toggleSelectAll"
            aria-label="전체 선택/해제"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" />
        </template>
      </BTable>

      <div class="d-flex justify-content-center mt-4">
        <BPagination
          v-model="currentPage"
          :total-rows="filteredItems.length"
          :per-page="perPage"
          aria-controls="manual-table"
        />
      </div>
    </div>
  </div>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btnRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <!-- modal 장치 수정 -->
  <UiModal v-model="modals.modalDeviceModify.show" :title="lang.modalTitleEdit" type="modal" size="lg" @close-btn-click="modals.modalDeviceModify.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalDeviceType }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
                disabled
              />
            </td>
            <th scope="row">{{ lang.modalModel }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.model"
                :options="modelOptions"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>


      <!-- 무선링크연동장치 & 음력전화연동장치 & 유무선통합중계기 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="KAF10270ASUCT10"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalL2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
          <th scope="row">{{ lang.modalIpAddress }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.ipAddress"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalCardCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
          <th scope="row"></th>
          <td></td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:6.3rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.cardNumber }}</th>
          <th scope="col">{{ lang.cardInterface }}</th>
          <th scope="col">{{ lang.label }}</th>
          <th scope="col" colspan="2">{{ lang.portManage }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">C01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardInterface1"
              :options="cardInterfaceTypeOptions"
            />
          </td>
          <td class="ta-c">C01</td>
          <td>P01 : 포트1번,  P02: 2번포트</td>
          <td>
            <BButton class="gray24 min-w-0" @click="modals.modalLabeling.show = true">{{ lang.btnLabeling }}</BButton>
          </td>
        </tr>
        <tr>
          <th scope="row">C02</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardInterface1"
              :options="cardInterfaceTypeOptions"
            />
          </td>
          <td class="ta-c"></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>

      <!-- 보안장비연동장치 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="장비설명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="KAF10270ASUCT10"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalL2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
          <th scope="row">{{ lang.modalIpAddress }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.ipAddress"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.deviceWireless }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
          <th scope="row">{{ lang.modalCardCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:6.3rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.cardNumber }}</th>
          <th scope="col">{{ lang.cardInterface }}</th>
          <th scope="col">{{ lang.label }}</th>
          <th scope="col" colspan="2">{{ lang.portManage }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">C01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardInterface1"
              :options="cardInterfaceTypeOptions"
            />
          </td>
          <td class="ta-c">C01</td>
          <td>P01 : 포트1번,  P02: 2번포트</td>
          <td>
            <BButton class="gray24 min-w-0" @click="modals.modalLabeling.show = true">{{ lang.btnLabeling }}</BButton>
          </td>
        </tr>
        <tr>
          <th scope="row">C02</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardInterface1"
              :options="cardInterfaceTypeOptions"
            />
          </td>
          <td class="ta-c"></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>

      <!-- 보안장비 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="장비설명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="KAF10270ASUCT10"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalL2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
          <th scope="row">{{ lang.modalIpAddress }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.ipAddress"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.deviceSecurityType }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
          <th scope="row">{{ lang.portCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.channelCount"
              :options="channelCountOptions"
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:30rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.thead1 }}</th>
          <th scope="col">{{ lang.thead2 }}</th>
          <th scope="col">{{ lang.thead3 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">P01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portType1"
              :options="portTypeOptions1"
            />
          </td>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <!-- VoIP 교환기 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" colspan="2">{{ lang.thead5 }}</th>
          <th scope="col" colspan="2">{{ lang.thead6 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ lang.deviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.deviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.serialNumber }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="시리얼번호"
            />
          </td>
          <th scope="row">{{ lang.serialNumber }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="시리얼번호"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.locationType }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.locationType }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.location }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.location }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.l2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
          <th scope="row">{{ lang.l2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.description"
              placeholder=""
              value=""
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.description"
              placeholder=""
              value=""
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" colspan="4">{{ lang.thead4 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">System IP(VIP)</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
          <th scope="row">SIP Port</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 무선통신기 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="장비설명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="KAF10270ASUCT10"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.transceiverType }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.transceiverType"
              :options="transceiverTypeOptions"
            />
          </td>
          <th scope="row">{{ lang.frequencyBand }}</th>
          <td>
           <BFormSelect
              class="ui-select"
              v-model="formData.frequencyBand"
              :options="frequencyBandOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.portCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
          <th scope="row">{{ lang.channelCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.channelCount"
              :options="channelCountOptions"
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:30rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.thead1 }}</th>
          <th scope="col">{{ lang.thead2 }}</th>
          <th scope="col">{{ lang.thead3 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">P01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portType1"
              :options="portTypeOptions1"
            />
          </td>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value=""
            />
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 스위치 -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.description"
              placeholder=""
              value="장비설명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.description"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
           <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="시리얼번호"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.locationDetail"
              placeholder=""
              value="시리얼번호"
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" colspan="4">{{ lang.switchAttributes }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ lang.poeSupport }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.managementIp }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.dashboardLabel }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value=""
            />
          </td>
          <th scope="row"></th>
          <td></td>
        </tr>
        </tbody>
      </table>

      <!-- 음력전화 & WT -->
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="장치명"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="장비설명"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="설명/비고"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="KAF10270ASUCT10"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.portCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portCount"
              :options="portCountOptions"
            />
          </td>
          <th scope="row"></th>
          <td></td>
        </tr>
        </tbody>
      </table>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:30rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.thead1 }}</th>
          <th scope="col">{{ lang.thead2 }}</th>
          <th scope="col">{{ lang.thead3 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">P01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portType1"
              :options="portTypeOptions1"
            />
          </td>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalName.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalLabeling.show" type="modal" size="md" @close-btn-click="modals.modalLabeling.show = false">
    <table class="table-type-a">
      <colgroup>
        <col style="width:10rem">
        <col style="width:auto">
        <col style="width:10rem">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ lang.cardNumber }}</th>
        <th scope="col">{{ lang.cardLabel }}</th>
        <th scope="col">{{ lang.portNumber }}</th>
        <th scope="col">{{ lang.portLabel }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row" rowspan="2">C01</th>
        <td rowspan="2">
          <BFormInput
            class="ui-input"
            v-model="formData.labelCardLabel1"
            placeholder=""
            value="C01"
          />
        </td>
        <th scope="row">P01</th>
        <td>
          <BFormInput
            class="ui-input"
            v-model="formData.labelPortLabel1"
            placeholder=""
            value="포트1번"
          />
        </td>
      </tr>
      <tr>
        <th scope="row">P02</th>
        <td>
          <BFormInput
            class="ui-input"
            v-model="formData.labelPortLabel2"
            placeholder=""
            value="포트2번"
          />
        </td>
      </tr>
      </tbody>
    </table>
    <template #footer>
      <BButton class="gray28" @click="modals.modalLabeling.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">적용</BButton>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  // 필터 영역
  filterDeviceType: '장치유형',
  filterSearchTarget: '검색대상',
  filterSearchWord: '검색어',
  filterRegDate: '등록일',

  // 검색 영역
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',

  thead1: '포트 식별`자',
  thead2: '포트 인터페이스 유형',
  thead3: '레이블',
  thead4: 'VoIP교환기 속성',
  thead5: 'VoIP 교환기 1',
  thead6: 'VoIP 교환기 2',

  // 버튼
  btnSearch: '조회',
  btnRegister: '등록',
  btnDelete: '삭제',
  btnSave: '저장',
  btnCancel: '취소',

  // 테이블 헤더
  colSelect: '선택',
  colNumber: '순번',
  colDeviceType: '장치유형',
  colModel: '모델',
  colDeviceName: '장치명',
  colGrade: '등급',
  colSerial: '시리얼번호',
  colLocation: '위치',
  colRegDate: '등록일',

  // 모달
  modalTitleEdit: '장치 수정',
  modalDeviceType: '장치유형',
  modalModel: '모델명',
  modalDeviceName: '장치명',
  modalDescription: '장비설명',
  modalGrade: '설명/비고',
  modalSerial: '시리얼번호',
  modalLocation: '위치',
  modalLocationDetail: '위치상세',
  modalL2Switch: 'L2 스위치',
  modalIpAddress: 'IP Address',
  modalCardCount: '카드갯수',
  modalServerTYpe: '서버타입',

  // 옵션
  optionSelect: '선택하세요',
  optionAdmin: '관리자',
  optionManager: '매니저',
  optionLocation1: '위치1',
  optionLocation2: '위치2',
  optionDetailA: 'A구역',
  optionDetailB: 'B구역',
  optionL2SW01: 'L2SW-01',
  optionL2SW02: 'L2SW-02',
  optionCardCount1: '1',
  optionCardCount2: '2',
  optionCardCount4: '4',
  optionEthernet: '이더넷',
  optionSerial: '시리얼',
  optionFiber: '광',

  // 추가 텍스트
  cardNumber: '카드번호',
  cardLabel: '카드레이블',
  portNumber: '포트번호',
  portLabel: '포트 레이블',
  cardInterface: '카드 인터페이스',
  label: '라벨',
  portManage: '포트관리',
  btnLabeling: '라벨링',
  deviceSecurityType: '보안장비유형',
  portCount: '포트갯수',
  deviceName: '장치명',
  serialNumber: '시리얼번호',
  locationType: '위치유형',
  location: '위치',
  locationDetail: '위치상세',
  l2Switch: 'L2 스위치',
  description: '설명/비고',
  transceiverType: '송수신유형',
  frequencyBand: '주파수대역',
  channelCount: '채널갯수',
  switchAttributes: '스위치 속성',
  poeSupport: 'POE 지원 여부',
  managementIp: '관리 IP',
  dashboardLabel: '대시보드 레이블',
  btnApply: '적용',
}
const en = {
  // Filter area
  filterDeviceType: 'Device Type',
  filterSearchTarget: 'Search Target',
  filterSearchWord: 'Search Word',
  filterRegDate: 'Registration Date',

  // Search area
  searchLabel: 'Search',
  searchPlaceholder: 'Enter search term',
  totalLabel: 'Total',

  thead1: 'Port Identifier',
  thead2: 'Port Interface Type',
  thead3: 'Label',
  thead4: 'VoIP Switch Attributes',
  thead5: 'VoIP Switch 1',
  thead6: 'VoIP Switch 2',

  // Buttons
  btnSearch: 'Search',
  btnRegister: 'Register',
  btnDelete: 'Delete',
  btnSave: 'Save',
  btnCancel: 'Cancel',

  // Table headers
  colSelect: 'Select',
  colNumber: 'No.',
  colDeviceType: 'Device Type',
  colModel: 'Model',
  colDeviceName: 'Device Name',
  colGrade: 'Grade',
  colSerial: 'Serial Number',
  colLocation: 'Location',
  colRegDate: 'Reg. Date',

  // Modal
  modalTitleEdit: 'Edit Device',
  modalDeviceType: 'Device Type',
  modalModel: 'Model Name',
  modalDeviceName: 'Device Name',
  modalDescription: 'Device Description',
  modalGrade: 'Description/Remarks',
  modalSerial: 'Serial Number',
  modalLocation: 'Location',
  modalLocationDetail: 'Location Detail',
  modalL2Switch: 'L2 Switch',
  modalIpAddress: 'IP Address',
  modalCardCount: 'Card Count',
  modalServerTYpe: 'Server TYpe',

  // Options
  optionSelect: 'Please Select',
  optionAdmin: 'Admin',
  optionManager: 'Manager',
  optionLocation1: 'Location 1',
  optionLocation2: 'Location 2',
  optionDetailA: 'Area A',
  optionDetailB: 'Area B',
  optionL2SW01: 'L2SW-01',
  optionL2SW02: 'L2SW-02',
  optionCardCount1: '1',
  optionCardCount2: '2',
  optionCardCount4: '4',
  optionEthernet: 'Ethernet',
  optionSerial: 'Serial',
  optionFiber: 'Fiber',

  // 추가 텍스트
  cardNumber: 'Card Number',
  cardInterface: 'Card Interface',
  label: 'Label',
  portManage: 'Port Management',
  btnLabeling: 'Labeling',
  deviceSecurityType: 'Security Device Type',
  portCount: 'Port Count',
  deviceName: 'Device Name',
  serialNumber: 'Serial Number',
  locationType: 'Location Type',
  location: 'Location',
  locationDetail: 'Location Detail',
  l2Switch: 'L2 Switch',
  description: 'Description/Remarks',
  transceiverType: 'Transceiver Type',
  frequencyBand: 'Frequency Band',
  channelCount: 'Channel Count',
  switchAttributes: 'Switch Attributes',
  poeSupport: 'POE Support',
  managementIp: 'Management IP',
  dashboardLabel: 'Dashboard Label',
  btnApply: 'Apply',
}

const lang = ref({})

// 수정 모달 상태
const modals = reactive({
  modalDeviceModify: { show: false },
  modalLabeling: { show: false },
 })
const formData = reactive({ deviceType: '', model: '' })
const deviceTypeOptions = computed(() => [{ value: formData.deviceType, text: formData.deviceType }])
const modelOptions = computed(() => [{ value: formData.model, text: formData.model }])

// 폼 상태
const searchWord = ref('')
const regDateStart = ref('')
const regDateEnd = ref('')
const filterText = ref('')
const searchField = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const searchTarget = ref(null)
const selectOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option1 ?? '' },
  { value: 'b', text: lang.value.option2 ?? '' },
])

const locationOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: '위치1', text: lang.value.optionLocation1 },
  { value: '위치2', text: lang.value.optionLocation2 }
]);

const locationDetailOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 'A구역', text: lang.value.optionDetailA },
  { value: 'B구역', text: lang.value.optionDetailB }
]);

const l2SwitchOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 'L2SW-01', text: lang.value.optionL2SW01 },
  { value: 'L2SW-02', text: lang.value.optionL2SW02 }
]);

const cardCountOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 1, text: lang.value.optionCardCount1 },
  { value: 2, text: lang.value.optionCardCount2 },
  { value: 4, text: lang.value.optionCardCount4 }
]);

const portTypeOptions1 = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 'Ethernet', text: lang.value.optionEthernet },
  { value: 'Serial', text: lang.value.optionSerial }
]);

const cardInterfaceTypeOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 'Ethernet', text: lang.value.optionEthernet },
  { value: 'Serial', text: lang.value.optionSerial },
  { value: 'Fiber', text: lang.value.optionFiber }
]);

const frequencyBandOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 'VHF', text: 'VHF' },
  { value: 'UHF', text: 'UHF' },
  { value: 'HF', text: 'HF' }
]);

const channelCountOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 4, text: '4' },
  { value: 8, text: '8' },
  { value: 16, text: '16' }
]);

const transceiverTypeOptions = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 4, text: '4' },
  { value: 8, text: '8' },
  { value: 16, text: '16' }
]);

const portCountOptions  = computed(() => [
  { value: '', text: lang.value.optionSelect },
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 4, text: '4' },
  { value: 8, text: '8' },
  { value: 16, text: '16' }
]);
// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const types = ['라우터', '스위치', '무전기', '중계기']
  const models = ['RTX-1000', 'SW-48P', 'VX-500', 'RG-200']
  const grades = ['A', 'B', 'C']
  const locations = ['후부장교실', '후부장교실2']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String((idx % 24)).padStart(2, '0')
    const minute = String((idx % 60)).padStart(2, '0')
    arr.push({
      id: i,
      number: String(n - i + 1),
      deviceType: types[idx % types.length],
      model: models[idx % models.length],
      deviceName: `${types[idx % types.length]}-${i}`,
      grade: grades[idx % grades.length],
      serial: `SN-${String(i).padStart(4, '0')}`,
      location: locations[idx % locations.length],
      regDate: `2025-11-${day} ${hour}:${minute}`,
    })
  }
  return arr
}

const selectedIds = ref([]);

// 테이블 필드: 선택,순번,장치유형,모델,장치명,등급,시리얼번호,위치,등록일
// 정렬 추가: 장치유형,모델,장치명,등급,위치,등록일

const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '5rem' } },
  { key: 'number', label: lang.value.colNumber, thStyle: { width: '8rem' } },
  { key: 'deviceType', label: lang.value.colDeviceType, sortable: true, thStyle: { width: '12rem' } },
  { key: 'model', label: lang.value.colModel, sortable: true, thStyle: { width: '12rem' } },
  { key: 'deviceName', label: lang.value.colDeviceName, sortable: true, thStyle: { width: '14rem' } },
  { key: 'grade', label: lang.value.colGrade, sortable: true, thStyle: { width: '10rem' } },
  { key: 'serial', label: lang.value.colSerial, thStyle: { width: '15rem' } },
  { key: 'location', label: lang.value.colLocation, sortable: true, thStyle: { width: 'auto' } },
  { key: 'regDate', label: lang.value.colRegDate, sortable: true, thStyle: { width: '14rem' } },
]);

// 실제 검색에 사용되는 값
const filterField = ref('')
const searchText = ref('')

const filterFieldOptions = computed(() => {
  const types = items.value.map(item => item.location)
  const uniqueTypes = [...new Set(types)]
  return [
    { value: '', text: '근무지' },
    ...uniqueTypes.map(type => ({ value: type, text: type }))
  ]
});

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchType = !searchField.value || item.location === searchField.value
    const matchText = !searchText.value || (item.location && item.location.includes(searchText.value))
    return matchType && matchText
  })
})

const currentPage = ref(1)
const perPage = ref(10)
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 페이지당 개수 변경 시 첫 페이지로 이동
watch(perPage, () => {
  currentPage.value = 1
})

// 헤더 체크박스 상태 (현재 페이지 기준)
const isAllSelected = computed(() => {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every(id => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter(id => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})

function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (checked) {
    // 현재 페이지의 모든 행 선택(중복 제거)
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    // 현재 페이지의 모든 행 선택 해제
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}

// 테이블 행 클릭 시 모달 열고 데이터 채우기
function onRowClicked(item) {
  if (!item) return;
  formData.deviceType = item.deviceType || '';
  formData.model = item.model || '';
  formData.deviceName = item.deviceName || '';
  formData.grade = item.grade || '';
  formData.serialNumber = item.serial || '';
  formData.location = item.location || '';
  formData.locationDetail = '';
  formData.l2Switch = '';
  formData.ipAddress = '';
  formData.cardCount = '';
  formData.portType1 = '';
  formData.portLabel = '';
  formData.cardInterface1 = '';
  modals.modalDeviceModify.show = true;
}

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  currentPage.value = 1
}

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
})
</script>

