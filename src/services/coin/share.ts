import toast from "react-hot-toast";

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
toast.success("با موفقیت به اشتراک گذاشته شد.")
    } catch  {
      toast.error("خطا در اشتراک گذاری")
    }
  } else {
    toast.error("مرورگر شما از اشتراک‌گذاری پشتیبانی نمی‌کند ");
  }
};

export default handleShare