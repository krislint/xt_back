const range = (start, end) => new Array(end - start).fill(start).map((el, i) => start + i)

const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const monthVisitData = shortMonth.map(m => {
  return {
    month: m,
    "Unique Visit": Math.floor(Math.random() * 1000) + 200,
    "Page View": Math.floor(Math.random() * 1000) + 250
  }
})

const campaignData = [
  {
    value: 335,
    name: "温州"
  },
  {
    value: 310,
    name: "绍兴"
  },
  {
    value: 135,
    name: "杭州"
  },
  {
    value: 548,
    name: "台州"
  },
  {
    value: 248,
    name: "衢州"
  },
  {
    value:354,
    name : "宁波"
  },
  {
    name:'湖州',
    value:245
  },
  {
    name:'丽水',
    value:143
  },
  {
    name:'舟山',
    value:242
  },
  {
    name:'金华',
    value:284
  },
  {
    name:'嘉兴',
    value:314
  }
  
]
const pageviewData=[
  {
    name:'视频赏析',
    value:79
  },
  {
    name:'图集欣赏',
    value:124
  },
  {
    name:'PPT下载',
    value:145
  },
  
]
const locationData = [
  {
    value: 50,
    name: "China"
  },
  {
    value: 35,
    name: "USA"
  },
  {
    value: 25,
    name: "EU"
  },
  {
    value: 10,
    name: "Russia"
  },
  {
    value: 10,
    name: "Other"
  }
]

const StackMainData = [
  220,
  182,
  191,
  234,
  290,
  330,
  310,
  123,
  442,
  321,
  90,
  149,
  210,
  122,
  133,
  334,
  198,
  123,
  125,
  220
]
const StackData = StackMainData.map((item, key) => {
  return {
    label: key + "D",
    max: 500,
    sales: item
  }
})
const SinData = range(1, 12).map(i => {
  return {
    cate: "Cat" + i,
    value: (Math.sin(i / 5) * (i / 5 - 0.1) + i / 6) * 5
  }
})

export { monthVisitData, campaignData, locationData, StackData, SinData,pageviewData }
