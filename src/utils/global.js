import config from "../../data/SiteConfig";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(utc)
dayjs.extend(advancedFormat)

// format date
const formatDate = date => dayjs.utc(date).format(config.dateFormat);

// scroll to top
const scrollToTop = () => {
    if (!window) return;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export { formatDate, scrollToTop };
