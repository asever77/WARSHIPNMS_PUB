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
                  <span class="day-number">
                    {{ day.month !== currentMonth && day.dayNumber === 1 ? day.month + '월 ' + day.dayNumber + '일' : (day.dayNumber === 1 && day.isCurrentMonth ? day.month + '월 ' + day.dayNumber + '일' : day.dayNumber) }}
                  </span>
              </div>
              <div class="day-body">
                <div
                  v-for="holiday in getHolidaysForDay(day)"
                  :key="holiday.id"
                  class="holiday-pill"
                  @click.stop="clickHoliday(holiday)"
                >
                  {{ holiday.title }}
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

// Default holidays list matching mockup:
const holidays = ref([
  { id: 1, title: '노동절', start: '2026-05-01', end: '2026-05-01' },
  { id: 2, title: '어린이날', start: '2026-05-05', end: '2026-05-05' }
])

const isEditMode = ref(false)
const form = ref({
  id: null,
  title: '',
  datestart: '',
  dateend: ''
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
      dateString: `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
    })
  }

  // Fill current month's days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      dayNumber: i,
      month: month,
      year: year,
      isCurrentMonth: true,
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
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
        dateString: `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      })
    }
  }

  // Ensure 6 weeks are rendered for spacing (42 cells)
  if (days.length === 35) {
    const startDay = days[days.length - 1].dayNumber + 1
    const m = month === 12 ? 1 : month + 1
    const y = month === 12 ? year + 1 : year
    for (let i = 0; i < 7; i++) {
      const dayNum = startDay + i
      days.push({
        dayNumber: dayNum,
        month: m,
        year: y,
        isCurrentMonth: false,
        dateString: `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
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
  return holidays.value.filter(h => {
    return day.dateString >= h.start && day.dateString <= h.end
  })
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

function clickHoliday(holiday) {
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
  if (confirm('선택한 휴일을 삭제하시겠습니까?')) {
    holidays.value = holidays.value.filter(h => h.id !== form.value.id)
    modals.modal1.show = false
  }
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
}
.calendar-table td:hover {
  background-color: #f8fafc;
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
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.holiday-pill:hover {
  background-color: #fca5a5;
  border-color: #ef4444;
}
</style>
