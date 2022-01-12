/**
 * @deprecated
 * @author all
 */
const tools = {
  /**
   * @description 根据时间戳格式化时间
   * @param { number || string } t 时间戳
   * @param { number } type 需要的时间类型
   * @param { string } dataType 时间戳类型(单位)
   * @returns { string } 返回时间字符串
   */
  getDate(t, type, dataType = "ms") {
    if (dataType === "s") {
      t = t * 1000;
    }
    let d;
    if (t === 0) {
      d = new Date(t);
    } else {
      d = new Date(t || new Date().getTime());
    }
    const time =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
      "-" +
      (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) +
      " " +
      (d.getHours() > 9 ? d.getHours() : "0" + d.getHours()) +
      ":" +
      (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()) +
      ":" +
      (d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds());
    if (type === 1) {
      return time.substring(0, 10);
    } else if (type === 2) {
      return time.substring(11, 19);
    } else if (type === 3) {
      return time.substring(0, 7);
    } else if (type === 4) {
      return time.substr(11, 5);
    } else if (type === 5) {
      return time.substr(0, 19);
    } else if (type === 6) {
      return time.substr(0, 16);
    } else if (type === 7) {
      return time.substring(11, 16);
    } else {
      return time;
    }
  },
  /**
   * @description 表单回填
   * @param { array } autoForm 待回填表单
   * @param { object } record 待回填数据
   */
  fillForm(autoForm, record) {
    return autoForm.map((item) => {
      let initValue;
      initValue = record[item.value] || "";
      if (Number(record[item.value]) === 0) {
        initValue = 0;
      }
      if (item.type === "rangeTime") {
        initValue = [record.startTime, record.endTime];
      }
      if (item.type === "checkbox") {
        initValue = Array.isArray(initValue) ? initValue : initValue.split(",");
      }
      if (item.type === "numberInput") {
        initValue = record[item.value] || 0;
      }
      if (item.type === "radio") {
        initValue = record[item.value];
      }
      if (
        item.type === "input" ||
        item.type === "select" ||
        item.type === "textarea"
      ) {
        initValue = record[item.value] || "";
      }
      const a = {
        ...item,
        initValue: initValue,
      };
      return a;
    });
  },
  // 自定义加法运算
  addNum: (num1, num2) => {
    var sq1, sq2, m;
    try {
      sq1 = num1.toString().split(".")[1].length;
    } catch (e) {
      sq1 = 0;
    }
    try {
      sq2 = num2.toString().split(".")[1].length;
    } catch (e) {
      sq2 = 0;
    }
    m = Math.pow(10, Math.max(sq1, sq2));
    return (num1 * m + num2 * m) / m;
  },
  /**
   * @description 延迟处理方法
   * @param { function } fn 待延迟执行的方法
   * @returns { undefined }
   */
  goNext: (fn, time = 1200) => {
    setTimeout(() => {
      fn();
    }, time);
  },
  /**
   * 操作提示
   * @param { string } type  提示类型（success，error，info，warning，warn，loading）
   * @param { string } msg 提示内容
   * @param { number } time 提示关闭时间
   * @returns { undefined }
   */
  message: (type, msg, time) => {
    if ($message.hasOwnProperty(type)) {
      $message[type](msg || "");
    } else {
      $message.info(msg || "");
    }
  },
  /**
   * 删除提示
   * @param { string } title  提示内容
   * @param { function } callback 回调函数
   */
  delTip(title = "确定删除吗?", fn) {
    vm.$Modal.confirm({
      title,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fn();
      },
    });
  },
  /**
   * 深拷贝一个值
   * @param value
   */
  cloneDeep(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === "object") {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (const i in target) {
          // 递归克隆数组中的每一项
          result.push(tools.cloneDeep(target[i]));
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null;
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {};
        for (const i in target) {
          result[i] = tools.cloneDeep(target[i]);
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target;
    }
    // 返回最终结果
    return result;
  },
  isEmpty(param) {
    if (param) {
      const paramType = typeof param;
      if (paramType === "object") {
        // 要判断的是【对象】或【数组】或【null】等
        if (typeof param.length === "undefined") {
          if (JSON.stringify(param) === "{}") {
            return true; // 空值，空对象
          }
        } else if (param.length === 0) {
          return true; // 空值，空数组
        }
      } else if (paramType === "string") {
        // 如果要过滤空格等字符
        var newParam = param.trim();
        if (newParam.length === 0) {
          // 空值，例如:带有空格的字符串" "。
          return true;
        }
      } else if (paramType === "boolean") {
        if (!param) {
          return true;
        }
      } else if (paramType === "number") {
        if (!param) {
          return true;
        }
      }
      return false; // 非空值
    } else {
      if (param === 0) {
        return false;
      } else {
        return true;
      }
      // 空值,例如：
      // (1)null
      // (2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
      // (3)空字符串''、""。
      // (4)数字0、00等，如果可以只输入0，则需要另外判断。
    }
  },
  /**
   * 金额保留2位小数
   * @param value
   */
  init$: (text) => {
    return text ? text.toFixed(2) + "元" : `0.00元`;
  },
  /**
   * 设置table滚动高度
   * @param value
   */
  setScroll(id) {
    if (document.getElementById(id)) {
      return document.getElementById(id).offsetHeight - 40;
    }
  },
  // 获取url文件名 后缀 类型
  getFileTypeByPath(path) {
    const typeObj = {
      fileName: "",
      fileType: "",
      fileExtension: "",
    };
    const index = path.lastIndexOf("/");
    typeObj.fileName = path.substr(index + 1);
    const index1 = path.lastIndexOf(".");
    typeObj.fileType = path.substr(index1 + 1);
    const index2 = path.length;
    typeObj.fileExtension = path.substr(index1, index2);
    return typeObj;
  },
  // 根据url下载文件
  downloadFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const blob = this.response;
        // 转换一个blob链接
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(
          new Blob([blob], {
            type: tools.getFileTypeByPath(url).fileType,
          })
        );
        a.download = tools.getFileTypeByPath(url).fileName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    };
    xhr.send();
  },
  // 时分转时间戳
  getTimestamp(time) {
    let s = 0;
    let hour = time.split(":")[0];
    hour = Number(hour) - 8;
    let min = time.split(":")[1];
    min = Number(min);
    // let sec = time.split(':')[2];
    // s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    s = hour * 3600 * 1000 + min * 60 * 1000;
    return s;
  },
  // 时间戳转时分秒
  timebystamp(data) {
    if (Number(data) < 0) return "00:00:00";
    var s;
    var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (data % (1000 * 60)) / 1000;
    s =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
    return s;
  },
  // 生成一个连续数值的数组
  numberArray(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start);
  },
  // 格式化文件大小
  dosizeformat(text) {
    if (!text) return "";
    text = Number(text);
    if (text < 1024) {
      return `${text}B`;
    } else if (text < 1024 * 1024) {
      return `${parseInt(text / 1024)}K`;
    } else if (text < 1024 * 1024 * 1024) {
      return `${parseInt(text / (1024 * 1024))}M`;
    } else if (text < 1024 * 1024 * 1024 * 1024) {
      return `${parseInt(text / (1024 * 1024 * 1024))}G`;
    }
  },
  // 获取大写数字
  getLargeNumber(num) {
    const changeNum = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
    ];
    const unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    const getWan = (temp) => {
      const strArr = temp.toString().split("").reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum =
          (i === 0 && strArr[i] === 0
            ? ""
            : i > 0 && strArr[i] === 0 && strArr[i - 1] === 0
            ? ""
            : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i])) +
          newNum;
      }
      return newNum;
    };
    const overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  },
  // 除对象中的空键值对
  delObjKey(obj) {
    for (var key in obj) {
      if (obj[key] === "" || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  },
  // 数组对象去重 根据str属性去重
  getBack(arr, str) {
    const obj = {};
    arr = arr.reduce((cur, next) => {
      obj[next[str]] ? "" : (obj[next[str]] = true && cur.push(next));
      return cur;
    }, []); // 设置cur默认类型为数组，并且初始值为空的数组
    return arr;
  },
  // 错误图片处理
  errorImg($event) {
    $event.target.src =
      "http://canpoint-static.oss-cn-beijing.aliyuncs.com/class-manage/house.png";
  },
};

export default tools;
