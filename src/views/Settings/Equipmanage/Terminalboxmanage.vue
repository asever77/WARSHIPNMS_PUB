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
          <BButton
            class="btn-sort"
            aria-sort="none"
            :aria-label="`${lang.filterDeviceType} 전체 정렬`"
          ></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">
          {{ lang.filterSearchTarget }}
          <BButton
            class="btn-sort"
            aria-sort="descending"
            :aria-label="`${lang.filterSearchTarget} 전체 정렬`"
          ></BButton>
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
          <BFormInput
            id="search-word"
            class="ui-input"
            v-model="searchWord"
            :placeholder="lang.searchPlaceholder"
          ></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{ lang.filterRegDate }}
          <BButton
            class="btn-sort"
            aria-sort="ascending"
            :aria-label="`${lang.filterRegDate} 전체 정렬`"
          ></BButton>
        </th>
        <td colspan="5">
          <div class="ui-flex" data-item-align="center" data-gap="4" style="width: 20rem">
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              v-model="regDateStart"
              :placeholder="lang.filterRegDate"
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
              v-model="regDateEnd"
              :placeholder="lang.filterRegDate"
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
        <span class="search-total">{{ `${lang.totalLabel}:15` }}</span>
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
            <button
              type="button"
              class="btn-search-icon"
              :aria-label="lang.btnSearch"
              @click="onFilter"
            />
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
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
        <template #head(select)>
          <BFormCheckbox
            :indeterminate="isIndeterminate"
            :model-value="isAllSelected"
            @update:modelValue="toggleSelectAll"
            :aria-label="`${lang.totalLabel} ${lang.colSelect}`"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" />
        </template>
        <template #cell(portManage)="data">
          <BButton class="gray24 min-w-0" @click.stop="onPortManage(data.item.id)">
            {{ lang.btnPortManage }}
          </BButton>
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

  <div class="ui-btn-group ui-flex" data-justify-align="between">
    <BButton class="blue28" @click="modals.modalConnectorRegister.show = true"
      >{{ lang.bulkRegisterAll }}</BButton
    >

    <div class="ui-btn-group">
      <BButton class="blue28" @click="modals.modalDeviceRegister.show = true"
        >{{ lang.btnRegister }}</BButton
      >
      <BButton class="gray28">{{ lang.btnDelete }}</BButton>
    </div>
  </div>

  <!-- modal 연결단자함/ICU 포트관리 -->
  <UiModal
    v-model="modals.modalICUPortAdmin.show"
    :title="lang.modalPortAdminTitle"
    type="modal"
    size="xlg"
    scrollable
    @close-btn-click="modals.modalICUPortAdmin.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <div class="ui-dashed-line-box">
        {{ `${lang.deviceName} : ${selectedPortDevice.deviceName}` }}
      </div>

      <div class="port-link-LR">
        <div class="flex-1">
          <h3 class="port-link-title">{{ lang.left }}</h3>
          <table class="table-type-a">
            <colgroup>
              <col style="width: 8rem" />
              <col style="width: 10rem" />
              <col style="width: auto" />
              <col style="width: 10rem" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ lang.portNumber }}</th>
                <th scope="col" colspan="2">{{ lang.portSettings }}</th>
                <th scope="col">{{ lang.mapping }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" rowspan="3">P01</th>
                <th scope="row">{{ lang.portLabel }}</th>
                <td>OP43DATA(보안장비 TX #1)</td>
                <td class="mapping-td" rowspan="3">
                  <div class="mapping-td--wrap">
                    <div class="mapping-td--item">
                      <BDropdown
                        text=""
                        variant="outline-secondary"
                        class="btn-portlink checked"
                        menu-class="p-3"
                        no-caret
                        ref="portDropdown"
                      >
                        <div class="d-flex flex-column gap-2 mb-3" @click.stop>
                          <BFormCheckbox v-model="portMapping.l01" value="1"
                            >{{ lang.option1 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l01" value="2"
                            >{{ lang.option2 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l01" value="3"
                            >{{ lang.option3 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l01" value="4"
                            >{{ lang.option4 }}</BFormCheckbox
                          >
                        </div>
                        <div class="ui-btn-group">
                          <BButton class="gray24 min-w-0" @click="onCancelPortMapping"
                            >{{ lang.btnCancel }}</BButton
                          >
                          <BButton class="blue24 min-w-0" @click="onConfirmPortMapping"
                            >{{ lang.apply }}</BButton
                          >
                        </div>
                      </BDropdown>
                    </div>
                    <div class="mapping-td--item">P6,P4</div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ lang.connectedDevice }}</th>
                <td @click="onConnectorDetail" style="cursor: pointer">OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.remark }}</th>
                <td></td>
              </tr>

              <tr>
                <th scope="row" rowspan="3">P02</th>
                <th scope="row">포트레이블</th>
                <td>OP43DATA(보안장비 TX #1)</td>
                <td class="mapping-td" rowspan="3">
                  <div class="mapping-td--wrap">
                    <div class="mapping-td--item">
                      <BDropdown
                        text=""
                        variant="outline-secondary"
                        class="btn-portlink checked"
                        menu-class="p-3"
                        no-caret
                        ref="portDropdown"
                      >
                        <div class="d-flex flex-column gap-2 mb-3" @click.stop>
                          <BFormCheckbox v-model="portMapping.l02" value="1"
                            >{{ lang.option1 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l02" value="2"
                            >{{ lang.option2 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l02" value="3"
                            >{{ lang.option3 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.l02" value="4"
                            >{{ lang.option4 }}</BFormCheckbox
                          >
                        </div>
                        <div class="ui-btn-group">
                          <BButton class="gray24 min-w-0" @click="onCancelPortMapping"
                            >{{ lang.btnCancel }}</BButton
                          >
                          <BButton class="blue24 min-w-0" @click="onConfirmPortMapping"
                            >{{ lang.apply }}</BButton
                          >
                        </div>
                      </BDropdown>
                    </div>
                    <div class="mapping-td--item">P6,P4</div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ lang.connectedDevice }}</th>
                <td @click="onConnectorDetail" style="cursor: pointer">OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.remark }}</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-1">
          <h3 class="port-link-title">{{ lang.right }}</h3>
          <table class="table-type-a">
            <colgroup>
              <col style="width: 10rem" />
              <col style="width: 8rem" />
              <col style="width: 10rem" />
              <col style="width: auto" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ lang.mapping }}</th>
                <th scope="col">{{ lang.portNumber }}</th>
                <th scope="col" colspan="2">{{ lang.portSettings }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mapping-td" rowspan="3">
                  <div class="mapping-td--wrap">
                    <div class="mapping-td--item">
                      <BDropdown
                        text=""
                        variant="outline-secondary"
                        class="btn-portlink"
                        menu-class="p-3"
                        no-caret
                        ref="portDropdown"
                      >
                        <div class="d-flex flex-column gap-2 mb-3" @click.stop>
                          <BFormCheckbox v-model="portMapping.r01" value="1"
                            >{{ lang.option1 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r01" value="2"
                            >{{ lang.option2 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r01" value="3"
                            >{{ lang.option3 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r01" value="4"
                            >{{ lang.option4 }}</BFormCheckbox
                          >
                        </div>
                        <div class="ui-btn-group">
                          <BButton class="gray24 min-w-0" @click="onCancelPortMapping"
                            >{{ lang.btnCancel }}</BButton
                          >
                          <BButton class="blue24 min-w-0" @click="onConfirmPortMapping"
                            >{{ lang.apply }}</BButton
                          >
                        </div>
                      </BDropdown>
                    </div>
                    <div class="mapping-td--item"></div>
                  </div>
                </td>
                <th scope="row" rowspan="3">P01</th>
                <th scope="row">{{ lang.portLabel }}</th>
                <td>OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.connectedDevice }}</th>
                <td @click="onConnectorDetail" style="cursor: pointer">OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.remark }}</th>
                <td></td>
              </tr>

              <tr>
                <td class="mapping-td" rowspan="3">
                  <div class="mapping-td--wrap">
                    <div class="mapping-td--item">
                      <BDropdown
                        text=""
                        variant="outline-secondary"
                        class="btn-portlink"
                        menu-class="p-3"
                        no-caret
                        ref="portDropdown"
                      >
                        <div class="d-flex flex-column gap-2 mb-3" @click.stop>
                          <BFormCheckbox v-model="portMapping.r02" value="1"
                            >{{ lang.option1 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="2"
                            >{{ lang.option2 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="3"
                            >{{ lang.option3 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="4"
                            >{{ lang.option4 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="5"
                            >{{ lang.option5 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="6"
                            >{{ lang.option6 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="7"
                            >{{ lang.option7 }}</BFormCheckbox
                          >
                          <BFormCheckbox v-model="portMapping.r02" value="8"
                            >{{ lang.option8 }}</BFormCheckbox
                          >
                        </div>
                        <div class="ui-btn-group">
                          <BButton class="gray24 min-w-0" @click="onCancelPortMapping"
                            >{{ lang.btnCancel }}</BButton
                          >
                          <BButton class="blue24 min-w-0" @click="onConfirmPortMapping"
                            >{{ lang.apply }}</BButton
                          >
                        </div>
                      </BDropdown>
                    </div>
                    <div class="mapping-td--item"></div>
                  </div>
                </td>
                <th scope="row" rowspan="3">P01</th>
                <th scope="row">{{ lang.portLabel }}</th>
                <td>OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.connectedDevice }}</th>
                <td @click="onConnectorDetail" style="cursor: pointer">OP43DATA(보안장비 TX #1)</td>
              </tr>
              <tr>
                <th scope="row">{{ lang.remark }}</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalICUPortAdmin.show = false"
        >{{ lang.btnCancel }}</BButton
      >
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <!-- modal 연결장치 -->
  <UiModal
    v-model="modals.modalConnectorDetail.show"
    type="modal"
    size="md"
    @close-btn-click="modals.modalConnectorDetail.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 10rem" />
          <col style="width: 10rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" colspan="2">{{ lang.taskType }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.deviceType }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.deviceName }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceName"
                :options="deviceNameOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" rowspan="3">{{ lang.connectedDevice }}</th>
            <th scope="row">{{ lang.deviceName }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="modelOptions" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.card }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceName"
                :options="deviceNameOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.port }}</th>
            <td>
              <div class="ui-flex" data-gap="4">
                <BFormSelect
                  class="ui-select"
                  v-model="formData.deviceName"
                  :options="deviceNameOptions"
                />
                <BFormSelect
                  class="ui-select"
                  v-model="formData.deviceName"
                  :options="deviceNameOptions"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.model }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="modelOptions" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalConnectorDetail.show = false"
        >{{ lang.btnCancel }}</BButton
      >
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <!-- modal 전체일관등록 -->
  <UiModal
    v-model="modals.modalConnectorRegister.show"
    :title="lang.modalConnectorRegisterTitle"
    type="modal"
    size="md"
    @close-btn-click="modals.modalConnectorRegister.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 10rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.fileRegister }}</th>
            <td>
              <BFormFile
                class="ui-input"
                v-model="formData.file"
                :placeholder="lang.fileSelect"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui-flex py-4" data-direction="col" data-gap="20" data-item-align="center">
        <p class="text-12-400">
          {{ lang.bulkGuide }}
        </p>
        <a href="/download/connector-bulk-template.cfg" download class="ui-link-underline"
          >{{ `${lang.bulkTemplate}.cfg` }}</a
        >
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalConnectorRegister.show = false"
        >{{ lang.btnCancel }}</BButton
      >
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <!-- modal 단자함/ICU 등록 -->
  <UiModal
    v-model="modals.modalDeviceRegister.show"
    :title="lang.modalDeviceRegisterTitle"
    type="modal"
    size="md"
    @close-btn-click="modals.modalDeviceRegister.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 10rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.deviceType }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.model }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="modelOptions" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.deviceName }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceName"
                :options="deviceNameOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row" rowspan="2">{{ lang.location }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.location"
                :options="locationOptions"
              />
            </td>
          </tr>
          <tr>
            <td>
              <BFormSelect
                v-if="formData.location === lang.locationRack"
                class="ui-select"
                v-model="formData.locationDetail2"
                :options="locationDetailOptions"
              />
              <BFormSelect
                v-else-if="formData.location === lang.locationZone"
                class="ui-select"
                v-model="formData.locationDetail3"
                :options="locationDetailOptions"
              />
              <BFormInput
                v-else-if="formData.location === lang.locationCustom"
                class="ui-input-28"
                v-model="formData.locationDetail4"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalDeviceRegister.show = false"
        >{{ lang.btnCancel }}</BButton
      >
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import {
  BButton,
  BFormGroup,
  BPagination,
  BTable,
  BFormCheckbox,
  BDropdown,
  BFormFile,
} from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'
import G from '@/config/global.js'

const ko = {
  filterDeviceType: '장치유형',
  filterSearchTarget: '검색대상',
  filterSearchWord: '검색어',
  filterRegDate: '등록일',
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  btnRegister: '등록',
  btnDelete: '삭제',
  btnSave: '저장',
  btnCancel: '취소',
  btnPortManage: '포트관리',
  bulkRegisterAll: '전체 일괄등록',
  colSelect: '선택',
  colNumber: '순번',
  colDeviceType: '장치유형',
  colModel: '모델',
  colDeviceName: '장치명',
  colLocation: '위치',
  colRegDate: '등록일',
  modalPortAdminTitle: '연결단자함/ICU 포트관리',
  modalConnectorRegisterTitle: '연결단자함 포트관리 일괄등록',
  modalDeviceRegisterTitle: '단자함/ICU 등록',
  fileRegister: '파일등록',
  fileSelect: '파일 선택',
  bulkGuide: '다음 문서 양식을 다운받아 작성 후 일괄등록에 사용할 수 있습니다.',
  bulkTemplate: '연결단자함일괄등록양식',
  deviceName: '장치명',
  portNumber: '포트번호',
  portSettings: '포트설정',
  mapping: '매핑',
  portLabel: '포트레이블',
  connectedDevice: '연결장치',
  remark: '비고',
  left: 'LEFT',
  right: 'RIGHT',
  option1: '옵션 1',
  option2: '옵션 2',
  option3: '옵션 3',
  option4: '옵션 4',
  option5: '옵션 5',
  option6: '옵션 6',
  option7: '옵션 7',
  option8: '옵션 8',
  apply: '적용',
  selectPlaceholder: '선택하세요',
  selectOption1: '옵션1',
  selectOption2: '옵션2',
  locationRack: '렉',
  locationZone: '구역',
  locationCustom: '사용자정의',
  locationDetailA: 'A구역',
  locationDetailB: 'B구역',
  taskType: '작업유형',
  card: '카드',
  port: '포트',
  model: '모델명',
  location: '위치',
  deviceType: '장치유형',
}
const en = {
  filterDeviceType: 'Device Type',
  filterSearchTarget: 'Search Target',
  filterSearchWord: 'Search Word',
  filterRegDate: 'Registration Date',
  searchLabel: 'Search',
  searchPlaceholder: 'Enter search term',
  totalLabel: 'Total',
  btnSearch: 'Search',
  btnRegister: 'Register',
  btnDelete: 'Delete',
  btnSave: 'Save',
  btnCancel: 'Cancel',
  btnPortManage: 'Port Management',
  bulkRegisterAll: 'Bulk Register All',
  colSelect: 'Select',
  colNumber: 'No.',
  colDeviceType: 'Device Type',
  colModel: 'Model',
  colDeviceName: 'Device Name',
  colLocation: 'Location',
  colRegDate: 'Reg. Date',
  modalPortAdminTitle: 'Connector/ICU Port Management',
  modalConnectorRegisterTitle: 'Connector Port Bulk Registration',
  modalDeviceRegisterTitle: 'Terminal Box / ICU Registration',
  fileRegister: 'File Upload',
  fileSelect: 'Select File',
  bulkGuide: 'Download and fill out the form to use for bulk registration.',
  bulkTemplate: 'ConnectorBulkTemplate',
  deviceName: 'Device Name',
  portNumber: 'Port Number',
  portSettings: 'Port Settings',
  mapping: 'Mapping',
  portLabel: 'Port Label',
  connectedDevice: 'Connected Device',
  remark: 'Note',
  left: 'LEFT',
  right: 'RIGHT',
  option1: 'Option 1',
  option2: 'Option 2',
  option3: 'Option 3',
  option4: 'Option 4',
  option5: 'Option 5',
  option6: 'Option 6',
  option7: 'Option 7',
  option8: 'Option 8',
  apply: 'Apply',
  selectPlaceholder: 'Select',
  selectOption1: 'Option 1',
  selectOption2: 'Option 2',
  locationRack: 'Rack',
  locationZone: 'Zone',
  locationCustom: 'Custom',
  locationDetailA: 'Area A',
  locationDetailB: 'Area B',
  taskType: 'Task Type',
  card: 'Card',
  port: 'Port',
  model: 'Model Name',
  location: 'Location',
  deviceType: 'Device Type',
}
const lang = ref(G.lang === 'en' ? en : ko)

// 수정 모달 상태
const modals = reactive({
  modalDeviceModify: { show: false },
  modalLabeling: { show: false },
  modalDeviceRegister: { show: false },
  modalICUPortAdmin: { show: false },
  modalConnectorDetail: { show: false },
  modalConnectorRegister: { show: false },
})
const formData = reactive({
  deviceType: '',
  model: '',
  location: lang.value.locationRack,
})
const selectedPortDevice = reactive({
  deviceName: '',
})
const portMapping = reactive({
  l01: [],
  r01: [],
  l02: [],
  r02: [],
})
const portDropdown = ref(null)
const deviceTypeOptions = computed(() => [
  { value: formData.deviceType, text: formData.deviceType },
])
const modelOptions = computed(() => [{ value: formData.model, text: formData.model }])
const deviceNameOptions = computed(() => [
  { value: '', text: lang.value.selectPlaceholder },
  { value: '장치1', text: '장치1' },
  { value: '장치2', text: '장치2' },
])

// 폼 상태
const searchWord = ref('')
const regDateStart = ref('')
const regDateEnd = ref('')
const filterText = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const searchTarget = ref(null)
const selectOptions = computed(() => [
  { value: null, text: lang.value.selectPlaceholder },
  { value: 'a', text: lang.value.selectOption1 },
  { value: 'b', text: lang.value.selectOption2 },
])

const locationOptions = computed(() => [
  { value: lang.value.locationRack, text: lang.value.locationRack },
  { value: lang.value.locationZone, text: lang.value.locationZone },
  { value: lang.value.locationCustom, text: lang.value.locationCustom },
])

const locationDetailOptions = computed(() => [
  { value: '', text: lang.value.selectPlaceholder },
  { value: lang.value.locationDetailA, text: lang.value.locationDetailA },
  { value: lang.value.locationDetailB, text: lang.value.locationDetailB },
])

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const types = ['라우터', '스위치', '무전기', '중계기']
  const models = ['RTX-1000', 'SW-48P', 'VX-500', 'RG-200']
  const grades = ['A', 'B', 'C']
  const locations = ['후부장교실', '후부장교실2']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = i - 1
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String(idx % 24).padStart(2, '0')
    const minute = String(idx % 60).padStart(2, '0')
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

const selectedIds = ref([])

// 테이블 필드: 선택,순번,장치유형,모델,장치명,등급,시리얼번호,위치,등록일
// 정렬 추가: 장치유형,모델,장치명,등급,위치,등록일

const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '5rem' } },
  { key: 'number', label: lang.value.colNumber, thStyle: { width: '8rem' } },
  {
    key: 'deviceType',
    label: lang.value.colDeviceType,
    sortable: true,
    thStyle: { width: '14rem' },
  },
  { key: 'model', label: lang.value.colModel, sortable: true, thStyle: { width: '14rem' } },
  {
    key: 'deviceName',
    label: lang.value.colDeviceName,
    sortable: true,
    thStyle: { width: '16rem' },
  },
  { key: 'location', label: lang.value.colLocation, sortable: true, thStyle: { width: 'auto' } },
  { key: 'regDate', label: lang.value.colRegDate, sortable: true, thStyle: { width: '16rem' } },
  { key: 'portManage', label: lang.value.btnPortManage, thStyle: { width: '14rem' } },
])

// 실제 검색에 사용되는 값
const searchText = ref('')

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchText =
      !searchText.value || (item.location && item.location.includes(searchText.value))
    return matchText
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
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every((id) => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter((id) => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})

function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (checked) {
    // 현재 페이지의 모든 행 선택(중복 제거)
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    // 현재 페이지의 모든 행 선택 해제
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  }
}

function onFilter() {
  searchText.value = filterText.value
  currentPage.value = 1
}

// 포트관리 버튼 클릭
function onPortManage(deviceId) {
  const device = items.value.find((item) => item.id === deviceId)
  if (device) {
    selectedPortDevice.deviceName = device.deviceName
    modals.modalICUPortAdmin.show = true
  }
}

// 포트 매핑 드롭다운 핸들러
function onCancelPortMapping() {
  portMapping.l01 = []
  portMapping.l02 = []
  portMapping.r01 = []
  portMapping.r02 = []
  if (portDropdown.value) {
    portDropdown.value.hide()
  }
}

function onConnectorDetail() {
  modals.modalConnectorDetail.show = true
}

function onConfirmPortMapping() {
  console.log('선택된 포트:', {
    l01: portMapping.l01,
    l02: portMapping.l02,
    r01: portMapping.r01,
    r02: portMapping.r02,
  })
  // 포트 매핑 로직 추가
  if (portDropdown.value) {
    portDropdown.value.hide()
  }
}

</script>
