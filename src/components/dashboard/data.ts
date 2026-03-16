export const slaData = [
  { name: "Install", onTime: 85, nearMiss: 10, missed: 5 },
  { name: "Service", onTime: 70, nearMiss: 20, missed: 10 },
  { name: "PM", onTime: 95, nearMiss: 5, missed: 0 },
  { name: "Onsite Reprog.", onTime: 80, nearMiss: 15, missed: 5 },
  { name: "OnCall Reprog.", onTime: 90, nearMiss: 5, missed: 5 },
];

export const jobsByRegion = [
  { name: 'BKK', value: 748, color: '#3b82f6' },
  { name: 'UPC', value: 500, color: '#10b981' },
];

export const jobTypesData = [
  { name: 'Install', value: 450, color: '#6366f1' },
  { name: 'Service', value: 320, color: '#ec4899' },
  { name: 'PM', value: 280, color: '#f59e0b' },
  { name: 'Reprogram', value: 198, color: '#14b8a6' },
];

export const resolutionData = [
  { name: 'Completed', value: 75, color: '#10b981' },
  { name: 'Rescheduled', value: 15, color: '#f59e0b' },
  { name: 'Failed', value: 10, color: '#ef4444' },
];

export const recentJobs = [
  { id: "JOB-2026-001", type: "Install", subType: "Setting", status: "In Progress", sla: "Warning", customer: "Bank Of Wealth", date: "Today, 10:00", area: "BKK" },
  { id: "JOB-2026-002", type: "Service", subType: "Hardware", status: "Pending", sla: "Missed", customer: "Retail Corp", date: "Yesterday", area: "UPC" },
  { id: "JOB-2026-003", type: "Onsite Reprog.", subType: "Loader", status: "In Progress", sla: "On Time", customer: "Tech Store", date: "Today, 14:00", area: "BKK" },
  { id: "JOB-2026-004", type: "PM", subType: "-", status: "Completed", sla: "On Time", customer: "Bank Of Wealth", date: "11 Mar 2026", area: "BKK" },
];

export const pendingApprovals = [
  { id: "REQ-001", type: "Duplicate Job", desc: "ร้าน Cafe สาขา 3 แจ้งซ่อมอาการเดิมซ้ำภายใน 30 วัน", reqBy: "Somchai (Tech)" },
  { id: "REQ-002", type: "Store Back", desc: "ขอเบิก SIM Card ใหม่ ทดแทนของเดิมชำรุด (JOB-002)", reqBy: "Wichai (Tech)" },
];

export const alerts = [
  { id: 1, type: 'critical', title: 'งานซ้ำภายในเดือน', desc: 'ร้าน Cafe สาขา 3 แจ้งซ่อมแบตเตอรี่เสื่อมซ้ำ (JOB-2026-008)', time: '10 mins ago' },
  { id: 2, type: 'warning', title: 'งานด่วนกระชั้นชิด (CS)', desc: 'งานติดตั้ง Bank Of Wealth สาขาใหม่ ต้องเข้าทำทันที', time: '1 hour ago' },
];

export const missedReasons = [
  { name: 'Customer Not Ready', count: 12 },
  { name: 'Spare Parts Delay', count: 8 },
  { name: 'Traffic / Distance', count: 5 },
  { name: 'Complex Tech Issue', count: 3 },
];

export const allJobsData = [
  { id: "JOB-2026-001", type: "Install", status: "In Progress", sla: "Warning", customer: "Bank Of Wealth", branch: "Silom", date: "2026-03-13", tech: "Somchai", techType: "SO", area: "BKK", tid: "TID-99882233", mid: "MID-1122334455", sn: "SN-AABBCCDD", convenientDate: "", reportedIssue: "เครื่องเปิดไม่ติด หน้าจอขึ้น Battery is low. รบกวนช่างนำแบตเตอรี่สำรองและสายชาร์จใหม่เข้าไปเปลี่ยนด้วย" },
  { id: "JOB-2026-011", type: "Service", status: "Pending", sla: "On Time", customer: "Cafe Amazon", branch: "Ladprao", date: "2026-03-16", tech: "Somchai", techType: "SO", area: "BKK", tid: "TID-11223300", mid: "MID-9988110022", sn: "SN-PP1122QQ", convenientDate: "", reportedIssue: "เครื่อง EDC ค้างบ่อย กด Transaction แล้วหน้าจอค้าง ต้องรีสตาร์ทเครื่องทุกครั้ง" },
  { id: "JOB-2026-002", type: "Service", status: "Pending", sla: "Missed", customer: "Retail Corp", branch: "Central", date: "2026-03-12", tech: "Unassigned", techType: "", area: "UPC", tid: "TID-77553311", mid: "MID-9988776655", sn: "SN-CCDDEE11", convenientDate: "2026-03-15", reportedIssue: "เครื่องพิมพ์ใบเสร็จขัด กระดาษออกไม่ได้ ลองกด Feed แล้วยังไม่ได้" },
  { id: "JOB-2026-003", type: "Reprogram", status: "In Progress", sla: "On Time", customer: "Tech Store", branch: "Mega", date: "2026-03-13", tech: "Wichai", techType: "SO", area: "BKK", tid: "TID-44221133", mid: "MID-5544332211", sn: "SN-FF8899AA", convenientDate: "", reportedIssue: "ต้องการ Reprogram ใส่ Key ใหม่ หลังจากเปลี่ยน Acquirer" },
  { id: "JOB-2026-004", type: "PM", status: "Completed", sla: "On Time", customer: "Bank Of Wealth", branch: "Asoke", date: "2026-03-11", tech: "Somsak", techType: "SO", area: "BKK", tid: "TID-11223344", mid: "MID-6677889900", sn: "SN-BB1122CC", convenientDate: "", reportedIssue: "PM ประจำไตรมาส ตรวจสอบสภาพอุปกรณ์และทำความสะอาด" },
  { id: "JOB-2026-005", type: "Service", status: "Completed", sla: "On Time", customer: "Cafe Amazon", branch: "Siam", date: "2026-03-10", tech: "Somchai", techType: "SO", area: "BKK", tid: "TID-55667788", mid: "MID-3344556677", sn: "SN-DD3344EE", convenientDate: "", reportedIssue: "หน้าจอแตก ลูกค้าทำหล่น ขอให้เปลี่ยน Display ใหม่" },
  { id: "JOB-2026-006", type: "Install", status: "Pending", sla: "On Time", customer: "Lotus", branch: "Rama 9", date: "2026-03-14", tech: "Unassigned", techType: "", area: "BKK", tid: "TID-99001122", mid: "MID-1234567890", sn: "SN-EE5566FF", convenientDate: "", reportedIssue: "ติดตั้งเครื่อง EDC ใหม่ สาขาเปิดใหม่ พร้อม SIM Card และ Setting โปรแกรม" },
  { id: "JOB-2026-007", type: "PM", status: "In Progress", sla: "On Time", customer: "Retail Corp", branch: "Chiang Mai", date: "2026-03-13", tech: "Kittipong", techType: "Outsource Team A", area: "UPC", tid: "TID-22334455", mid: "MID-0099887766", sn: "SN-GG7788HH", convenientDate: "", reportedIssue: "PM ประจำปี เช็คสภาพแบตเตอรี่และอัปเดต Firmware" },
  { id: "JOB-2026-008", type: "Service", status: "Pending", sla: "Warning", customer: "Bank Of Wealth", branch: "Phuket", date: "2026-03-13", tech: "Unassigned", techType: "", area: "UPC", tid: "TID-66778899", mid: "MID-5566778899", sn: "SN-II9900JJ", convenientDate: "2026-03-14", reportedIssue: "รูด Card ไม่ได้ ลอง Clean หัวอ่านแล้วยังไม่ได้ อาจต้องเปลี่ยน Card Reader" },
  { id: "JOB-2026-009", type: "Reprogram", status: "Completed", sla: "Missed", customer: "7-Eleven", branch: "Sukhumvit", date: "2026-03-09", tech: "Wichai", techType: "SO", area: "BKK", tid: "TID-33445566", mid: "MID-2233445566", sn: "SN-KK1122LL", convenientDate: "", reportedIssue: "เปลี่ยน Bank Host ใหม่ ต้อง Reprogram และทดสอบ Transaction" },
  { id: "JOB-2026-010", type: "Install", status: "In Progress", sla: "On Time", customer: "Big C", branch: "Pattaya", date: "2026-03-13", tech: "Niran", techType: "Outsource Team A", area: "UPC", tid: "TID-77889900", mid: "MID-8877665544", sn: "SN-MM3344NN", convenientDate: "", reportedIssue: "ติดตั้ง EDC เพิ่มอีก 2 จุด บริเวณ Counter Cashier ชั้น 2" },
];

export const monthlyTrendsData = [
  { name: 'Jan', completed: 850, incoming: 920 },
  { name: 'Feb', completed: 920, incoming: 890 },
  { name: 'Mar', completed: 1100, incoming: 1150 },
  { name: 'Apr', completed: 1050, incoming: 1080 },
  { name: 'May', completed: 1250, incoming: 1200 },
  { name: 'Jun', completed: 1180, incoming: 1250 },
];
