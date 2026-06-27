<template>
  <div class="base-wrap">
    <!-- Calendar Navigation Header -->
    <div class="calendar-header-actions ui-flex" data-justify-align="center" data-item-align="center" style="position: relative;">
      <div style="position: absolute; left: 0; top: 50%; transform: translateY(-50%);">
        <BButton class="gray28" @click="goToToday">오늘</BButton>
      </div>
      <div class="ui-flex" data-item-align="center" data-gap="12">
        <button type="button" class="nav-arrow" @click="prevYear">&lt;&lt;</button>
        <button type="button" class="nav-arrow" @click="prevMonth">&lt;</button>
        <span class="calendar-title fs-4 font-bold">{{ currentYear }}년 {{ String(currentMonth).padStart(2, '0') }}월</span>
        <button type="button" class="nav-arrow" @click="nextMonth">&gt;</button>
        <button type="button" class="nav-arrow" @click="nextYear">&gt;&gt;</button>
      </div>
      <div></div>
    </div>

    <!-- Calendar Month Grid -->
    <div class="calendar-container ">
      <table class="calendar-table">
        <thead>
          <tr>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
            <th>일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wIndex) in calendarWeeks" :key="wIndex">
            <td
              v-for="(day, dIndex) in week"
              :key="dIndex"
              :class="{ 'other-month': !day.isCurrentMonth }"
              @click="clickDay(day)"
            >
              <div class="day-cell">
                <div class="day-header">
                  <span
                    class="day-number"
                    :class="{
                      'is-sunday': day.dayOfWeek === 0,
                      'is-saturday': day.dayOfWeek === 6,
                      'is-holiday': isHoliday(day)
                    }"
                  >
                    {{ day.dayNumber }}
                  </span>
                </div>
                <div class="day-body">
                  <div
                    v-for="holiday in getHolidaysForDay(day)"
                    :key="holiday.id"
                    class="holiday-pill"
                    :class="{
                      'default-holiday': holiday.isDefault,
                      'h-abs-start': day.dateString === holiday.start,
                      'h-abs-end': day.dateString === holiday.end
                    }"
                    @click.stop="clickHoliday(holiday)"
                  >
                    <span v-if="day.dateString === holiday.start || day.dayOfWeek === 1">
                      {{ holiday.title }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Holiday Registration Modal -->
  <UiModal
    v-model="modals.modal1.show"
    :title="isEditMode ? '휴일 수정' : '휴일 등록'"
    type="modal"
    size="md"
    @close-btn-click="modals.modal1.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">제목</th>
            <td>
              <BFormInput type="text" class="ui-input" v-model="form.title" placeholder="휴일 제목 입력" />
            </td>
          </tr>
          <tr>
            <th scope="row">기간</th>
            <td>
              <div class="ui-flex ui-data-box" data-item-align="center" data-gap="4">
                <BFormInput type="date" class="ui-input" v-model="form.datestart" />
                ~
                <BFormInput type="date" class="ui-input" v-model="form.dateend" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
        <BButton class="gray28" @click="modals.modal1.show = false">취소</BButton>
        <BButton v-if="isEditMode" class="blue28" @click="deleteHoliday">삭제</BButton>
        <BButton class="blue28" @click="saveHoliday">{{ isEditMode ? '수정' : '등록' }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BButton } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  title1: '방송 휴일 관리',
}

const en = {
  title1: 'Broadcast Holiday Manage',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentYear = ref(2026)
const currentMonth = ref(5) // Default to May 2026 to match mockup

// Holidays list (User's custom holidays):
const holidays = ref([])

const isEditMode = ref(false)
const form = ref({
  id: null,
  title: '',
  datestart: '',
  dateend: ''
})

// Default South Korean holidays list/calculation helper
function getDefaultHolidays(year) {
  const list = [
    { title: '신정', start: `${year}-01-01`, end: `${year}-01-01`, isDefault: true },
    { title: '삼일절', start: `${year}-03-01`, end: `${year}-03-01`, isDefault: true },
    { title: '노동절', start: `${year}-05-01`, end: `${year}-05-01`, isDefault: true },
    { title: '어린이날', start: `${year}-05-05`, end: `${year}-05-05`, isDefault: true },
    { title: '현충일', start: `${year}-06-06`, end: `${year}-06-06`, isDefault: true },
    { title: '광복절', start: `${year}-08-15`, end: `${year}-08-15`, isDefault: true },
    { title: '개천절', start: `${year}-10-03`, end: `${year}-10-03`, isDefault: true },
    { title: '한글날', start: `${year}-10-09`, end: `${year}-10-09`, isDefault: true },
    { title: '기독탄신일', start: `${year}-12-25`, end: `${year}-12-25`, isDefault: true },
  ]

  // Add lunar calendar holidays for years 2025 to 2030
  if (year === 2025) {
    list.push(
      { title: '설날', start: '2025-01-28', end: '2025-01-30', isDefault: true },
      { title: '석가탄신일', start: '2025-05-05', end: '2025-05-05', isDefault: true },
      { title: '대체공휴일(석가탄신일)', start: '2025-05-06', end: '2025-05-06', isDefault: true },
      { title: '추석', start: '2025-10-05', end: '2025-10-07', isDefault: true },
      { title: '대체공휴일(추석)', start: '2025-10-08', end: '2025-10-08', isDefault: true }
    )
  } else if (year === 2026) {
    list.push(
      { title: '설날', start: '2026-02-16', end: '2026-02-18', isDefault: true },
      { title: '석가탄신일', start: '2026-05-24', end: '2026-05-24', isDefault: true },
      { title: '대체공휴일(석가탄신일)', start: '2026-05-25', end: '2026-05-25', isDefault: true },
      { title: '추석', start: '2026-09-24', end: '2026-09-26', isDefault: true },
      { title: '대체공휴일(추석)', start: '2026-09-28', end: '2026-09-28', isDefault: true }
    )
  } else if (year === 2027) {
    list.push(
      { title: '설날', start: '2027-02-06', end: '2027-02-08', isDefault: true },
      { title: '대체공휴일(설날)', start: '2027-02-09', end: '2027-02-09', isDefault: true },
      { title: '석가탄신일', start: '2027-05-13', end: '2027-05-13', isDefault: true },
      { title: '추석', start: '2027-09-14', end: '2027-09-16', isDefault: true }
    )
  } else if (year === 2028) {
    list.push(
      { title: '설날', start: '2028-01-26', end: '2028-01-28', isDefault: true },
      { title: '석가탄신일', start: '2028-05-02', end: '2028-05-02', isDefault: true },
      { title: '추석', start: '2028-10-02', end: '2028-10-04', isDefault: true },
      { title: '대체공휴일(추석)', start: '2028-10-05', end: '2028-10-05', isDefault: true }
    )
  } else if (year === 2029) {
    list.push(
      { title: '설날', start: '2029-02-12', end: '2029-02-14', isDefault: true },
      { title: '석가탄신일', start: '2029-05-20', end: '2029-05-20', isDefault: true },
      { title: '대체공휴일(석가탄신일)', start: '2029-05-21', end: '2029-05-21', isDefault: true },
      { title: '추석', start: '2029-09-21', end: '2029-09-23', isDefault: true },
      { title: '대체공휴일(추석)', start: '2029-09-24', end: '2029-09-24', isDefault: true }
    )
  } else if (year === 2030) {
    list.push(
      { title: '설날', start: '2030-02-02', end: '2030-02-04', isDefault: true },
      { title: '대체공휴일(설날)', start: '2030-02-05', end: '2030-02-05', isDefault: true },
      { title: '석가탄신일', start: '2030-05-10', end: '2030-05-10', isDefault: true },
      { title: '추석', start: '2030-10-05', end: '2030-10-07', isDefault: true },
      { title: '대체공휴일(추석)', start: '2030-10-08', end: '2030-10-08', isDefault: true }
    )
  }

  // Assign IDs to default holidays
  list.forEach((item, idx) => {
    item.id = `default-${year}-${idx}`
  })
  return list
}

// Combine custom and default holidays
const allHolidays = computed(() => {
  const customList = holidays.value.map(h => ({ ...h, isDefault: false }))
  const defaults = [
    ...getDefaultHolidays(currentYear.value - 1),
    ...getDefaultHolidays(currentYear.value),
    ...getDefaultHolidays(currentYear.value + 1)
  ]
  return [...defaults, ...customList]
})

// =========================
// [달력 계산 로직]
// =========================
const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value // 1-indexed (1 ~ 12)

  // First day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayInstance = new Date(year, month - 1, 1)
  let firstDayOfWeek = firstDayInstance.getDay()

  // Shift Sunday to index 6, Monday to 0, Tuesday to 1, etc.
  let startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Total days in the month
  const totalDays = new Date(year, month, 0).getDate()

  // Total days in the previous month
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate()

  const days = []

  // Fill previous month's days
  for (let i = startOffset - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i
    const m = month === 1 ? 12 : month - 1
    const y = month === 1 ? year - 1 : year
    days.push({
      dayNumber: dayNum,
      month: m,
      year: y,
      isCurrentMonth: false,
      dateString: `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
      dayOfWeek: new Date(y, m - 1, dayNum).getDay()
    })
  }

  // Fill current month's days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      dayNumber: i,
      month: month,
      year: year,
      isCurrentMonth: true,
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      dayOfWeek: new Date(year, month - 1, i).getDay()
    })
  }

  // Fill next month's days to make grid complete
  const remaining = days.length % 7
  if (remaining > 0) {
    const nextDaysCount = 7 - remaining
    for (let i = 1; i <= nextDaysCount; i++) {
      const m = month === 12 ? 1 : month + 1
      const y = month === 12 ? year + 1 : year
      days.push({
        dayNumber: i,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateString: `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayOfWeek: new Date(y, m - 1, i).getDay()
      })
    }
  }

  // Ensure 6 weeks are rendered for spacing (42 cells)
  if (days.length === 35) {
    const startDay = days[days.length - 1].isCurrentMonth ? 1 : days[days.length - 1].dayNumber + 1
    const m = month === 12 ? 1 : month + 1
    const y = month === 12 ? year + 1 : year
    for (let i = 0; i < 7; i++) {
      const dayNum = startDay + i
      days.push({
        dayNumber: dayNum,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateString: `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        dayOfWeek: new Date(y, m - 1, dayNum).getDay()
      })
    }
  }

  return days
})

const calendarWeeks = computed(() => {
  const weeks = []
  const days = calendarDays.value
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
})

// =========================
// [UI 이벤트 핸들러]
// =========================
function goToToday() {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
}

function prevYear() {
  currentYear.value -= 1
}

function nextYear() {
  currentYear.value += 1
}

function prevMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

function nextMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

function getHolidaysForDay(day) {
  return allHolidays.value.filter(h => {
    return day.dateString >= h.start && day.dateString <= h.end
  })
}

function isHoliday(day) {
  return getHolidaysForDay(day).length > 0
}





function clickHoliday(holiday) {
  if (holiday.isDefault) return
  isEditMode.value = true
  form.value = {
    id: holiday.id,
    title: holiday.title,
    datestart: holiday.start,
    dateend: holiday.end
  }
  modals.modal1.show = true
}

function saveHoliday() {
  if (isEditMode.value && String(form.value.id).startsWith('default-')) {
    alert('기본 대한민국 휴일은 수정할 수 없습니다.')
    return
  }
  if (!form.value.title) {
    alert('휴일 제목을 입력해주세요.')
    return
  }
  if (!form.value.datestart || !form.value.dateend) {
    alert('기간을 입력해주세요.')
    return
  }
  if (form.value.datestart > form.value.dateend) {
    alert('종료일은 시작일보다 빠를 수 없습니다.')
    return
  }

  if (isEditMode.value) {
    const idx = holidays.value.findIndex(h => h.id === form.value.id)
    if (idx !== -1) {
      holidays.value[idx] = {
        id: form.value.id,
        title: form.value.title,
        start: form.value.datestart,
        end: form.value.dateend
      }
    }
  } else {
    holidays.value.push({
      id: Date.now(),
      title: form.value.title,
      start: form.value.datestart,
      end: form.value.dateend
    })
  }
  modals.modal1.show = false
}

function deleteHoliday() {
  if (String(form.value.id).startsWith('default-')) {
    alert('기본 대한민국 휴일은 삭제할 수 없습니다.')
    return
  }
  if (confirm('선택한 휴일을 삭제하시겠습니까?')) {
    holidays.value = holidays.value.filter(h => h.id !== form.value.id)
    modals.modal1.show = false
  }
}

function clickDay(day) {
  isEditMode.value = false
  form.value = {
    id: null,
    title: '',
    datestart: day.dateString,
    dateend: day.dateString
  }
  modals.modal1.show = true
}

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>

<style scoped>
.calendar-header-actions {
  margin-top: 0;
}
.calendar-title {
  min-width: 18rem;
  text-align: center;
  user-select: none;
}
.nav-arrow {
  background: transparent;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  color: #64748b;
  padding: 0.2rem 0.8rem;
  transition: color 0.2s ease;
}
.nav-arrow:hover {
  color: #0f172a;
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
}
.calendar-table th {
  padding: 0.4rem;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-weight: bold;
  text-align: center;
  color: #334155;
  font-size: 1.4rem;
}
.calendar-table td {
  border: 1px solid #cbd5e1;
  height: 10rem;
  vertical-align: top;
  padding: 0.6rem;
  width: 14.28%;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.15s ease;
  position: relative; /* 호버 시 outline 노출을 위한 relative 처리 */
}
.calendar-table td:hover {
  background-color: #f8fafc;
  outline: 2px solid #3b82f6 !important; /* 마우스 호버 시 외곽선을 파란색으로 두껍게 강조 */
  outline-offset: -2px;
  z-index: 10;
}
.calendar-table td.other-month {
  background-color: #f8fafc;
  opacity: 0.55;
}

.day-cell {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.day-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}
.day-number {
  font-size: 1.2rem;
  font-weight: 500;
  color: #475569;
}
.day-number.is-saturday {
  color: #3b82f6 !important;
}
.day-number.is-holiday,
.day-number.is-sunday {
  color: #ef4444 !important;
}
.default-holiday {
  display: none !important;
}
.day-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.holiday-pill {
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 0.4rem;
  padding: 0.2rem 0.4rem;
  font-size: 1.2rem;
  color: #b91c1c;
  margin-top: 0.4rem;
  min-height:2.5rem;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  /* 연속된 휴일 연결을 위한 기본 마진 및 보더 제어 (중간 및 주간 연결 세그먼트) */
  border-left: none;
  border-right: none;
  border-radius: 0;
  margin-left: -0.6rem;
  margin-right: -0.6rem;
}
/* 휴일의 절대 시작 지점: 왼쪽 테두리와 라운드 적용 및 패딩 안으로 마진 조정 */
.holiday-pill.h-abs-start {
  border-left: 1px solid #fca5a5;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  margin-left: 0;
  text-align: left;
  padding-left: 0.4rem;
}
/* 휴일의 절대 종료 지점: 오른쪽 테두리와 라운드 적용 및 패딩 안으로 마진 조정 */
.holiday-pill.h-abs-end {
  border-right: 1px solid #fca5a5;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  margin-right: 0;
}
.holiday-pill:hover {
  background-color: #fca5a5;
  border-color: #ef4444;
}
</style>
