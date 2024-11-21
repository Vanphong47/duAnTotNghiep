module.exports = (query) => {
    const filterState = [
        {
            name: 'Tất cả',
            status: '',
            class: ''
        },
        {
            name: 'Hoạt động',
            status: 'active',
            class: ''
        },
        {
            name: 'Dừng hoạt động',
            status: 'inactive',
            class: ''
        }
    ]
    if(query.status) {
        const index = filterState.findIndex(item => item.status == query.status);
        filterState[index].class = 'bg-[#1876D2] text-white';
    } else {
        filterState[0].class = 'bg-[#1876D2] text-white'
    }
    return filterState;
}