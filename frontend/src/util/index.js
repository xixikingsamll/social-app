import dayjs from 'dayjs';



export const getTimeDiff = (currentTime) => {
    // 直接使用dayjs解析传入的ISO 8601格式字符串时间
    const postTime = dayjs(currentTime);
    const now = dayjs();
    const diffInMinutes = now.diff(postTime, 'minute');

    if (diffInMinutes < 30) {
        return `${Math.max(1, diffInMinutes)}分钟之前`;
    }
    const diffInHours = now.diff(postTime, 'hour');
    if (diffInHours < 24) {
        return `${Math.max(1, diffInHours)}小时之前`;
    }
    const diffInDays = now.diff(postTime, 'day');
    if (diffInDays < 30) {
        return `${Math.max(1, diffInDays)}天之前`;
    }
    return '一个月以前';
};