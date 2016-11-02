
const tabs = { all: '全部', good: '精华', share: '分享', ask: '问答', job: '招聘' };

export function getTabs() {
    return Object.keys(tabs).map((key, index) => {
        return {
            key,
            name: tabs[key]
        }
    });
}

export function getTabName(key) {
    return tabs[key];
}