const dayjs = require('dayjs');

// Format date utility
const formatDate = (timestamp) => {
    return dayjs(timestamp).format('MMM DD, YYYY [at] h:mm A');
};

module.exports = formatDate;
