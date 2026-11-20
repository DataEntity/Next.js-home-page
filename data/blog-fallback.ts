export type BlogPost = {
  title: string
  href: string
  date: string
  summary: string
}

export const blogFallback: BlogPost[] = [
  {
    title: '愛倫坡及其深邃人物心智',
    href: 'https://blog.kirishima.dev/writing/2026/11/edgar-allan-poe-and-the-profound-minds-of-his-characters/',
    date: '2026/11/12',
    summary:
      '在閱讀Poe的哥特作品時, 我們總會發覺Poe筆下的敘述者常常像竭力表現出自己並無異樣, 但恰恰是這樣, 反而讓我們越發感受到敘述者的不可靠與逐漸顯露的癲狂. 人物往往試圖通過敘述證明自己的理性, 卻在證明的過程中暴露出自身意識的縫隙',
  },
  {
    title: '後殖民視角下的"局外人"',
    href: 'https://blog.kirishima.dev/writing/2026/11/the-stranger-and-postcolonial-critique/',
    date: '2026/11/09',
    summary:
      '默爾索在海灘上殺死的阿拉伯人, 始終沒有在小說中獲得姓名. 這種敘事上的缺席意味著什麼? 當一部小說試圖呈現人類普遍的荒誕處境時, 它是否也無意間遮蔽了殖民地的歷史現實?',
  },
  {
    title: '關於查資料撞上訂閱牆',
    href: 'https://blog.kirishima.dev/writing/2026/11/academic-paywalls/',
    date: '2026/11/08',
    summary:
      '在線論文的訂閱牆與高校認證，讓高中生很難走相對容易的通道解答疑問。真正的研究者至少有制度化的檢索與取得渠道，獨立學習者卻得自己拼湊。',
  },
  {
    title: '咖啡廳的帕累托溫度',
    href: 'https://blog.kirishima.dev/writing/2026/11/cafe-pareto-temperature/',
    date: '2026/11/01',
    summary:
      '新找到的咖啡廳初體驗算不上好。偏熱，像找到了剛好脫離舒適區間的帕累托點——燙嘴的熱美式配偏熱的店，但凡有一點煩躁就會開始感到熱。',
  },
]
