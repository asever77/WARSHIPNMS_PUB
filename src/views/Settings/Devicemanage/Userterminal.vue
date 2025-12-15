<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter1 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" aria-label="{{ lang.filter1 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect class="ui-select"></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter3 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect class="ui-select"></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter4 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect class="ui-select"></BFormSelect>
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
        <span class="search-total">Online:36</span>
        <span class="search-total">Offline:177</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="{{ lang.btnSearch }}" @click="onFilter" ></button>
          </div>
        </BFormGroup>
        <BFormSelect class="ui-select-28"></BFormSelect>
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
            aria-label="{{ lang.searchSelect }}"
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
    <BButton class="blue28">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <UiModal
    v-model="modals.modalTerminalModify.show"
    :title="lang.modalTitle1"
    type="modal"
    size="lg"
    @close-btn-click="modals.modalTerminalModify.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 6rem" />
          <col style="width: 8rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalth1 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'MC700',}
                ]"
              />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth2 }}</th>
            <td>
              <BFormInput type="number" value="50" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth3 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput type="number" value="50" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth5 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth6 }}</th>
            <td>
              <BFormInput type="number" value="50" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth7 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row" rowspan="3">{{ lang.modalth8 }}</th>
            <th scope="row">{{ lang.modalth9 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '모닝글로리',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth10 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row">{{ lang.modalth11 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '기상나팔',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth12 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'ON',}
                ]"
              />
            </td>
            <th scope="row">{{ lang.modalth13 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '기상나팔',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.modalth14 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '구역',}
                ]"
              />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth15 }}</th>
            <td>
              <BFormInput type="tel" class="ui-input" />
            </td>
          </tr>

          <tr>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '전탐실',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth16 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '무선통신기시스템',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth17 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '6',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth18 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'ON',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth19 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'OFF',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth20 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  {value: '1', text: 'OFF',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

        </tbody>
      </table>
    </div>
    <template #footer>
      <div class="ui-flex ui-w-full" data-gap="16">
        <BButton class="navy28"  @click="modals.modalPointSetting.show = true">{{ lang.btnSetting }}</BButton>
        <div class="ml-auto ui-flex" data-gap="10">
          <BButton class="gray28" @click="modals.modalTerminalModify.show = false">{{ lang.btnCancel }}</BButton>
          <BButton class="blue28">{{ lang.btnSave }}</BButton>
        </div>
      </div>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalPointSetting.show" :title="'BRDG1 CAPTS'" type="modal" size="lg" class="p0-type" @close-btn-click="modals.modalPointSetting.show = false">
    <div class="ui-flex" data-direction="row" data-gap="8" style="padding-top: 0;">
      <UiTabs id="tabs-group-2" type="userDevice">
        <!-- 슬롯을 통해 BTab 컴포넌트들을 전달합니다. -->
        <BTab active>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-1.svg" alt="icon" />
            <span>{{ lang.ccTab1 }}</span>
          </template>

          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify1(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify1" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-2.svg" alt="icon" />
            <span>{{ lang.ccTab2 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify2(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify2" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-3.svg" alt="icon" />
            <span>{{ lang.ccTab3 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify3(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify3" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-4.svg" alt="icon" />
            <span>{{ lang.ccTab4 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify4(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify4" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-5.svg" alt="icon" />
            <span>{{ lang.ccTab5 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify5(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify5" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-6.svg" alt="icon" />
            <span>{{ lang.ccTab6 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify6(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify6" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
        <BTab>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-7.svg" alt="icon" />
            <span>{{ lang.ccTab7 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify7(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify7" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
      </UiTabs>
    </div>
  </UiModal>

  <UiModal v-model="modals.modalModify1.show" :title="lang.ccTab1Title" type="modal" size="md" @close-btn-click="modals.modalModify1.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh1_1 }}</th>
            <td>
              <b>피호출 사용자단말명</b>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_2 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_3 }}</th>
            <td>
              <BFormSelect disabled class="ui-select" :options="[{ value: '1', text: '선택' },]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_4 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[{ value: '1', text: '선택' },]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_5 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[{ value: '1', text: '선택' },]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_6 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox2 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh1_7 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox3 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox4 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify1.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify2.show" :title="lang.ccTab2Title" type="modal" size="md" @close-btn-click="modals.modalModify2.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh2_1 }}</th>
            <td>
              <b>회의통화명</b>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_2 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_3 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_4 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox5 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox6 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_5 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_6 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_7 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_8 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox2 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh2_9 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox3 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox4 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify2.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify3.show" :title="lang.ccTab3Title" type="modal" size="md" @close-btn-click="modals.modalModify3.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh3_1 }}</th>
            <td><b>그룹통화명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_2 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_3 }}</th>
            <td>
              <BFormSelect class="ui-select mb-1" :disabled="true" :options="[ { value: '1', text: '선택' }, ]" />
              <BFormCheckbox value="1">{{ lang.checkbox7 }}</BFormCheckbox>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_4 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox5 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox6 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_5 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_6 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_7 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_8 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox2 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh3_9 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox3 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox4 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify3.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify4.show" :title="lang.ccTab4Title" type="modal" size="md" @close-btn-click="modals.modalModify4.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh4_1 }}</th>
            <td><b>항목명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh4_2 }}</th>
            <td>
              <BFormInput class="ui-input"  />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh4_3 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' },]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh4_4 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh4_5 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox2 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify4.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify5.show" :title="lang.ccTab5Title" type="modal" size="md" @close-btn-click="modals.modalModify5.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh5_1 }}</th>
            <td><b>항목명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh5_2 }}</th>
            <td>
              <BFormInput class="ui-input"  />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh5_3 }}</th>
            <td>
              <BFormSelect class="ui-select" :disabled="true" :options="[ { value: '1', text: '선택' },]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify5.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify6.show" :title="lang.ccTab6Title" type="modal" size="md" @close-btn-click="modals.modalModify6.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh6_1 }}</th>
            <td><b>경보명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh6_2 }}</th>
            <td>
              <BFormInput class="ui-input"  />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify6.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalModify7.show" :title="lang.ccTab7Title" type="modal" size="md" @close-btn-click="modals.modalModify7.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh7_1 }}</th>
            <td><b>CCTV구역명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh7_2 }}</th>
            <td>
              <BFormInput class="ui-input"  />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify7.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect, BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'
import { BTab } from 'bootstrap-vue-next'
import UiTabs from '@/components/UiTabs.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  sortAll: '전체 정렬',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '검색대상',
  filter2: '검색어',
  filter3: '무선침묵권한',
  filter4: '상태',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '취소',
  btnSave: '저장',
  btnAdd: '추가',
  btnSetting: '통화기능키 설정 ',

  colTh1: 'No',
  colTh2: '위치(구역)',
  colTh3: '장치명',
  colTh4: '무선침묵',
  colTh5: '경보권한',
  colTh6: '방송권한',
  colTh7: 'Mute권한',
  colTh8: '내선번호',
  colTh9: '상태',
  colTh10: 'IP Address',

  modalTitle1: '사용자단말 정보 수정',

  modalth1: '모델명',
  modalth2: '스피커볼륨',
  modalth3: '장치명',
  modalth4: '헤드셋볼륨',
  modalth5: '설명/비고',
  modalth6: '화면밝기',
  modalth7: '시리얼 번호',
  modalth8: '벨소리',
  modalth9: '점대점',
  modalth10: '가입자정보 (내선번호)',
  modalth11: '회의통화',
  modalth12: '무선침묵 설정',
  modalth13: '그룹통화',
  modalth14: '위치',
  modalth15: '자동연결 대기시간(초)',
  modalth16: 'L2 스위치',
  modalth17: '무선채널 최대할당 개수',
  modalth18: '경보권한',
  modalth19: '방송권한',
  modalth20: 'Muting-Relay 기능',
  modalth21: '모델명',

  ccTab1: '점대점 통화',
  ccTab2: '회의통화',
  ccTab3: '그룹통화',
  ccTab4: '무선통신기',
  ccTab5: '방송장비',
  ccTab6: '경보',
  ccTab7: 'CCTV',

  ccTab1Title: '점대점 연결 등록',
  ccTab2Title: '회의통화 연결 등록',
  ccTab3Title: '그룹통화 연결 등록',
  ccTab4Title: '무선통신기 연결 등록',
  ccTab5Title: '방송장비 연결 등록',
  ccTab6Title: '경보 연결 등록',
  ccTab7Title: 'CCTV 연결 등록 ',

  // 점대점
  ccTh1_1: '피호출 사용자단말',
  ccTh1_2: '통화기능키 레이블',
  ccTh1_3: '통화모드',
  ccTh1_4: '응답모드',
  ccTh1_5: '녹음제어',
  ccTh1_6: '스피커 출력방향',
  ccTh1_7: '호출알림',
  // 회의통화
  ccTh2_1: '회의통화명',
  ccTh2_2: '통화기능키 레이블',
  ccTh2_3: '통화모드',
  ccTh2_4: '호출권한',
  ccTh2_5: '발언권한',
  ccTh2_6: '응답모드',
  ccTh2_7: '녹음제어',
  ccTh2_8: '스피커 출력방향',
  ccTh2_9: '호출알림',
  // 그룹통화
  ccTh3_1: '그룹통화명',
  ccTh3_2: '통화기능키 레이블',
  ccTh3_3: '통화모드',
  ccTh3_4: '호출권한',
  ccTh3_5: '발언권한',
  ccTh3_6: '응답모드',
  ccTh3_7: '녹음설정',
  ccTh3_8: '스피커 출력방향',
  ccTh3_9: '호출알림',
  // 무선통신
  ccTh4_1: '무선통신기명',
  ccTh4_2: '통화기능키 레이블',
  ccTh4_3: '통화모드',
  ccTh4_4: '녹음설정',
  ccTh4_5: '스피커 출력방향',
  // 방송장비
  ccTh5_1: '항목명',
  ccTh5_2: '통화기능키 레이블',
  ccTh5_3: '통화모드',
  // 경보
  ccTh6_1: '경보명',
  ccTh6_2: '통화기능키 레이블',
  // CCTV
  ccTh7_1: 'CCTV구역명',
  ccTh7_2: '통화기능키 레이블',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
  checkbox5: '발신',
  checkbox6: '착신',
  checkbox7: '일방통화',
}
const en = {
  sortAll: '전체 정렬',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '검색대상',
  filter2: '검색어',
  filter3: '무선침묵권한',
  filter4: '상태',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '취소',
  btnSave: '저장',
  btnAdd: '추가',
  btnSetting: '통화기능키 설정 ',

  colTh1: 'No',
  colTh2: '위치(구역)',
  colTh3: '장치명',
  colTh4: '무선침묵',
  colTh5: '경보권한',
  colTh6: '방송권한',
  colTh7: 'Mute권한',
  colTh8: '내선번호',
  colTh9: '상태',
  colTh10: 'IP Address',

  modalTitle1: '사용자단말 정보 수정',

  modalth1: '모델명',
  modalth2: '스피커볼륨',
  modalth3: '장치명',
  modalth4: '헤드셋볼륨',
  modalth5: '설명/비고',
  modalth6: '화면밝기',
  modalth7: '시리얼 번호',
  modalth8: '벨소리',
  modalth9: '점대점',
  modalth10: '가입자정보 (내선번호)',
  modalth11: '회의통화',
  modalth12: '무선침묵 설정',
  modalth13: '그룹통화',
  modalth14: '위치',
  modalth15: '자동연결 대기시간(초)',
  modalth16: 'L2 스위치',
  modalth17: '무선채널 최대할당 개수',
  modalth18: '경보권한',
  modalth19: '방송권한',
  modalth20: 'Muting-Relay 기능',
  modalth21: '모델명',

  ccTab1: '점대점 통화',
  ccTab2: '회의통화',
  ccTab3: '그룹통화',
  ccTab4: '무선통신기',
  ccTab5: '방송장비',
  ccTab6: '경보',
  ccTab7: 'CCTV',

  ccTab1Title: '점대점 연결 등록',
  ccTab2Title: '회의통화 연결 등록',
  ccTab3Title: '그룹통화 연결 등록',
  ccTab4Title: '무선통신기 연결 등록',
  ccTab5Title: '방송장비 연결 등록',
  ccTab6Title: '경보 연결 등록',
  ccTab7Title: 'CCTV 연결 등록 ',

  // 점대점
  ccTh1_1: '피호출 사용자단말',
  ccTh1_2: '통화기능키 레이블',
  ccTh1_3: '통화모드',
  ccTh1_4: '응답모드',
  ccTh1_5: '녹음제어',
  ccTh1_6: '스피커 출력방향',
  ccTh1_7: '호출알림',
  // 회의통화
  ccTh2_1: '회의통화명',
  ccTh2_2: '통화기능키 레이블',
  ccTh2_3: '통화모드',
  ccTh2_4: '호출권한',
  ccTh2_5: '발언권한',
  ccTh2_6: '응답모드',
  ccTh2_7: '녹음제어',
  ccTh2_8: '스피커 출력방향',
  ccTh2_9: '호출알림',
  // 그룹통화
  ccTh3_1: '그룹통화명',
  ccTh3_2: '통화기능키 레이블',
  ccTh3_3: '통화모드',
  ccTh3_4: '호출권한',
  ccTh3_5: '발언권한',
  ccTh3_6: '응답모드',
  ccTh3_7: '녹음설정',
  ccTh3_8: '스피커 출력방향',
  ccTh3_9: '호출알림',
  // 무선통신
  ccTh4_1: '무선통신기명',
  ccTh4_2: '통화기능키 레이블',
  ccTh4_3: '통화모드',
  ccTh4_4: '녹음설정',
  ccTh4_5: '스피커 출력방향',
  // 방송장비
  ccTh5_1: '항목명',
  ccTh5_2: '통화기능키 레이블',
  ccTh5_3: '통화모드',
  // 경보
  ccTh6_1: '경보명',
  ccTh6_2: '통화기능키 레이블',
  // CCTV
  ccTh7_1: 'CCTV구역명',
  ccTh7_2: '통화기능키 레이블',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
  checkbox5: '발신',
  checkbox6: '착신',
  checkbox7: '일방통화',
}
const lang = ref({})
const ppButtons = [
  'HLCPTR CONTRC', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM'
];

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modalTerminalModify: { show: false },
  modalPointSetting: { show: false },
  modalModify1: { show: false },
  modalModify2: { show: false },
  modalModify3: { show: false },
  modalModify4: { show: false },
  modalModify5: { show: false },
  modalModify6: { show: false },
  modalModify7: { show: false },
})
function openModify1() { modals.modalModify1.show = true } // 점대점
function openModify2() { modals.modalModify2.show = true } // 회의통화
function openModify3() { modals.modalModify3.show = true } // 그룹통화
function openModify4() { modals.modalModify4.show = true } // 무선통신기
function openModify5() { modals.modalModify5.show = true } // 방송장비
function openModify6() { modals.modalModify6.show = true } // 경보
function openModify7() { modals.modalModify7.show = true } // CCTV

// =========================
// [상태/폼/리스트 관리]
// =========================
const filterText = ref('') // 검색어
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수
const perPageOptions = [ { value: 10, text: '10' }, { value: 15, text: '15' }, { value: 20, text: '20' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const statuses = ['정상', '정상(통화중)', '비정상']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      th1: String(i),
      th2: '위치내용',
      th3: '장치명내용',
      th4: 'O',
      th5: 'O',
      th6: 'O',
      th7: 'O',
      th8: '3000',
      th9: statuses[idx % statuses.length],
      th10: '192.168.1.4',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '7rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '7rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '7rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: '7rem' } },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: '6rem' } },
  {
    key: 'th9',
    label: lang.value.colTh9,
    thStyle: { width: '9rem' },
    tdClass: (value, key, item) => item.th9 === '비정상' ? 'red' : '',
  },
  { key: 'th10', label: lang.value.colTh10, thStyle: { width: '10rem' } },
])

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
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
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modalTerminalModify.show = true }
function onFilter() { currentPage.value = 1 }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
