export default {
    pagination: {
        previous: '前のページ',
        next: '次のページ',
        ellipsis: '...',
        page: (page: number) => `第 ${page} ページ`,
    },
    loading: '読み込み中...',
    noRecordsFound: '記録が見つかりませんでした',
    error: 'データの取得中にエラーが発生しました',
};
