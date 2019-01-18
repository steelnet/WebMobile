function getCalendar(hevent) {
  // 从点击按钮开始循环查找到上一级标签包含有itemScope属性为止，这里的hevent的标签元素是body
  while (hevent && (!hevent.itemScope || !hevent.itemType.contains('http://microformats.org/profile/hcalendar#vevent')))
  { hevent = hevent.parentNode;
    //测试上一级标签
	alert(hevent.nodeName);}
  if (!hevent) {
    alert('没有事件数据！');
    return;
  }
  var stamp = new Date();
  var stampString = '' + stamp.getUTCFullYear() + (stamp.getUTCMonth() + 1) + stamp.getUTCDate() + 'T' +
                         stamp.getUTCHours() + stamp.getUTCMinutes() + stamp.getUTCSeconds() + 'Z';
  var calendar = 'BEGIN:VCALENDAR\r\nPRODID:HTML\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTAMP:' + stampString + '\r\n';
  for (var propIndex = 0; propIndex < hevent.properties.length; propIndex += 1) {
    var prop = hevent.properties[propIndex];
    var value = prop.itemValue;
    var parameters = '';
    if (prop.localName == 'time') {
      value = value.replace(/[:-]/g, '');
      if (value.match(/T/))
        parameters = ';VALUE=DATE';
      else
        parameters = ';VALUE=DATE-TIME';
    } else {
      value = value.replace(/\\/g, '\\n');
      value = value.replace(/;/g, '\\;');
      value = value.replace(/,/g, '\\,');
      value = value.replace(/\n/g, '\\n');
    }
    for (var nameIndex = 0; nameIndex < prop.itemProp.length; nameIndex += 1) {
      var name = prop.itemProp[nameIndex];
      if (!name.match(/:/) && !name.match(/\./))
        calendar += name.toUpperCase() + parameters + ':' + value + '\r\n';
    }
  }
  calendar += 'END:VEVENT\r\nEND:VCALENDAR\r\n';
  return 'data:text/calendar;component=vevent,' + encodeURI(calendar);
}