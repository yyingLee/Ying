// 小兔鲜儿网站交互功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('网站加载完成，开始初始化功能...');
    
    // 轮播图功能
    initBanner();
    
    // 导航交互
    initNavigation();
    
    // 品牌轮播
    initBrandCarousel();
    
    // 商品分类切换
    initCategoryTabs();
    
    // 搜索功能
    initSearch();
    
    // 购物车交互
    initCart();
    
    // 回到顶部功能
    initBackToTop();
});

// 轮播图功能
function initBanner() {
    const bannerItems = document.querySelectorAll('.pic li');
    const dots = document.querySelectorAll('.banner ol li, .dots li');
    
    console.log('找到轮播图项目:', bannerItems.length);
    console.log('找到圆点:', dots.length);
    
    if (bannerItems.length === 0) {
        console.error('未找到轮播图元素！');
        return;
    }
    
    let currentIndex = 0;
    
    // 更新轮播图显示
    function updateBanner() {
        console.log('切换到轮播图:', currentIndex);
        
        // 隐藏所有轮播项
        bannerItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
        
        // 更新圆点状态
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 圆点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log('点击圆点:', index);
            currentIndex = index;
            updateBanner();
        });
    });
    
    // 初始显示第一张
    updateBanner();
    
    // 自动轮播（每5秒切换）
    setInterval(() => {
        currentIndex = (currentIndex + 1) % bannerItems.length;
        updateBanner();
    }, 5000);
}

// 导航交互
function initNavigation() {
    const navItems = document.querySelectorAll('.nav a');
    const subnavItems = document.querySelectorAll('.subnav li');
    
    console.log('找到主导航项:', navItems.length);
    console.log('找到侧导航项:', subnavItems.length);
    
    // 主导航悬停效果
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#5EB69C';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '#333';
        });
    });
    
    // 侧导航悬停效果
    subnavItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(94, 182, 156, 0.8)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// 品牌轮播功能
function initBrandCarousel() {
    const brandList = document.querySelector('.brand ul');
    const leftArrow = document.querySelector('.jiantou .left');
    const rightArrow = document.querySelector('.jiantou .right');
    const brandItems = document.querySelectorAll('.brand ul li');
    
    console.log('品牌轮播元素:', {
        brandList: !!brandList,
        leftArrow: !!leftArrow,
        rightArrow: !!rightArrow,
        brandItems: brandItems.length
    });
    
    if (!brandList || brandItems.length === 0) {
        console.log('品牌轮播元素未找到，跳过初始化');
        return;
    }
    
    let currentPosition = 0;
    const itemWidth = brandItems[0].offsetWidth + 24;
    
    // 左箭头点击
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            if (currentPosition < 0) {
                currentPosition += itemWidth;
                brandList.style.transform = `translateX(${currentPosition}px)`;
                brandList.style.transition = 'transform 0.3s ease';
            }
        });
    }
    
    // 右箭头点击
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            const maxPosition = -itemWidth * (brandItems.length - 5);
            if (currentPosition > maxPosition) {
                currentPosition -= itemWidth;
                brandList.style.transform = `translateX(${currentPosition}px)`;
                brandList.style.transition = 'transform 0.3s ease';
            }
        });
    }
}

// 商品分类切换
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.fresh .title ul a');
    
    console.log('找到分类标签:', categoryTabs.length);
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击分类:', this.textContent);
            
            // 移除其他标签的激活状态
            categoryTabs.forEach(t => {
                t.style.backgroundColor = '';
                t.style.color = '#333';
            });
            
            // 设置当前标签为激活状态
            this.style.backgroundColor = '#5EB69C';
            this.style.color = '#fff';
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search input');
    const searchIcon = document.querySelector('.search .iconfont');
    
    console.log('搜索元素:', {
        searchInput: !!searchInput,
        searchIcon: !!searchIcon
    });
    
    if (searchInput) {
        // 搜索图标点击事件
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                performSearch();
            });
        }
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // 输入框聚焦效果
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderBottomColor = '#5EB69C';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderBottomColor = '#F4F4F4';
        });
    }
    
    function performSearch() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            alert(`搜索关键词: ${keyword}`);
        } else {
            alert('请输入搜索关键词');
        }
    }
}

// 购物车交互
function initCart() {
    const cart = document.querySelector('.cart a');
    const cartCount = document.querySelector('.cart i');
    
    console.log('购物车元素:', {
        cart: !!cart,
        cartCount: !!cartCount
    });
    
    if (cart) {
        cart.addEventListener('click', function(e) {
            e.preventDefault();
            alert('跳转到购物车页面');
        });
    }
    
    // 模拟添加到购物车功能
    const addToCartButtons = document.querySelectorAll('.goods .bd li, .fresh .right li, .goods ul li');
    
    console.log('找到商品项:', addToCartButtons.length);
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 防止点击链接或图片时触发
            if (e.target.tagName === 'A' || e.target.tagName === 'IMG') return;
            
            console.log('添加商品到购物车');
            
            // 更新购物车数量
            if (cartCount) {
                let count = parseInt(cartCount.textContent) || 0;
                count++;
                cartCount.textContent = count;
                
                // 添加动画效果
                cartCount.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 300);
            }
            
            alert('商品已添加到购物车！');
        });
    });
}

// 回到顶部功能
function initBackToTop() {
    const backToTop = document.createElement('div');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 50px;
        right: 30px;
        width: 40px;
        height: 40px;
        background: #5EB69C;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 20px;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTop);
    
    // 悬停效果
    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#4CAF50';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.background = '#5EB69C';
        this.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('回到顶部按钮已创建');
}

// 调试函数：检查图片加载状态
function checkImages() {
    const images = document.querySelectorAll('img');
    console.log('页面中的图片数量:', images.length);
    
    images.forEach((img, index) => {
        console.log(`图片 ${index + 1}:`, {
            src: img.src,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
        });
        
        img.onload = function() {
            console.log(`图片加载成功: ${img.src}`);
        };
        
        img.onerror = function() {
            console.error(`图片加载失败: ${img.src}`);
        };
    });
}

// 页面加载完成后检查图片
setTimeout(checkImages, 1000);