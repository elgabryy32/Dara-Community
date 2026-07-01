// دالة لجلب وعرض الصور من مجلد معين على GitHub تلقائياً
async function loadGalleryImages(folderName, containerId) {
    const owner = 'elgabry32'; // اسم حسابك على جيت هاب
    const repo = 'Dara-Community'; // اسم المستودع الحالي
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/images/${folderName}`;
    const container = document.getElementById(containerId);

    if (!container) return; // تأكد أن الحاوية موجودة في الصفحة

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('فشل في جلب الصور من GitHub');
        
        const files = await response.json();
        
        // تفريغ الحاوية أولاً
        container.innerHTML = '';

        // تصفية الملفات للتأكد من أنها صور فقط
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name));

        if (imageFiles.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center w-full">لا توجد صور في هذا القسم حالياً.</p>';
            return;
        }

        // إنشاء العناصر وعرض الصور
        imageFiles.forEach(file => {
            const imgElement = document.createElement('div');
            imgElement.className = 'overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-1 cursor-pointer';
            
            // تم تصحيح هذا الجزء لإضافة وسم الصورة الفعلي
            imgElement.innerHTML = `
                <img src="${file.download_url}" alt="صورة من المجمع" class="w-full h-48 object-cover rounded-md hover:scale-105 transition-transform duration-300">
            `;
            
            imgElement.addEventListener('click', () => {
                // تأكد أن لديك دالة openLightbox معرفة في صفحتك
                if (typeof openLightbox === 'function') {
                    openLightbox(file.download_url);
                }
            });

            container.appendChild(imgElement);
        });

    } catch (error) {
        console.error('حدث خطأ أثناء تحميل الألبوم:', error);
        container.innerHTML = '<p class="text-red-500 text-center w-full">حدث خطأ أثناء تحميل الصور.</p>';
    }
}

// تشغيل الدالة لكل قسم عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages('Mosque', 'mosque-gallery-container');
    loadGalleryImages('Plans', 'plans-gallery-container');
    loadGalleryImages('Buildings', 'buildings-gallery-container');
});