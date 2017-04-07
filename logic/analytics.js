let analytics = (function($){
  return {
    startTime: () => {
        return +new Date()
    },
    endTime: () => {
        return +new Date()
    },
    calculateTotalTime: (start, end) => {
      return end - start
    },
    typo: (typoInfo) => {
      $.ajax({
        type: "POST",
        data: typoInfo,
        url: "/typo",
        success: () => {
          console.log('ayo')
        }
      })
    }
  }
})($);
