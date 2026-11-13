// ============================================================
//  影片連結（由 site_writeback.py 自動回寫，也可以手動改）
//  youtube ：影片 ID 或網址      short  ：直式重點版（Shorts）ID
//  duration：片長 "6:35"          sections：各小節開始秒數（數量＝小節數），null 用 content.js 預估
//  noVoice ：無旁白版 ID          mp4    ：自架 MP4（沒有 YouTube 時才用）
// ============================================================

window.SERIES_PLAYLIST = ""; // 系列播放清單網址（公開或不公開後才填）
window.SERIES_TRAILER = "";  // 系列前導片 ID（延續型系列）

window.VIDEO_LINKS = {
  u01: { youtube: "RXdMzdvpkCI", mp4: "", duration: "", sections: [0, 38.3, 92.3, 154.8, 226.2, 285.5, 349.8], noVoice: "", short: "" },
  u02: { youtube: "E3Z_yqLX2Gg", mp4: "", duration: "7:24", sections: [0, 57.3, 129, 192.4, 330.8, 409.2], noVoice: "", short: "" },
  u03: { youtube: "PeVmJ0GHl2Y", mp4: "", duration: "8:16", sections: [0, 57.9, 165.9, 273.3, 354, 455], noVoice: "", short: "" },
  u04: { youtube: "PEeOXji2YIE", mp4: "", duration: "8:35", sections: [0, 75, 172.5, 276, 358.1, 456.4], noVoice: "", short: "" },
  u05: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u06: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u07: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u08: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u09: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u10: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" },
  u11: { youtube: "", mp4: "", duration: "", sections: null, noVoice: "", short: "" }
};
