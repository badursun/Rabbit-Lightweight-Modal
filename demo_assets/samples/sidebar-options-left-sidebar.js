({
    title: "Navigation Menu",
    content: `
        <div class="sidebar-menu">
            <div class="menu-section">
                <h3>Main Menu</h3>
                <ul>
                    <li><a href="#dashboard"><span class="icon">📊</span>Dashboard</a></li>
                    <li><a href="#profile"><span class="icon">👤</span>Profile</a></li>
                    <li><a href="#settings"><span class="icon">⚙️</span>Settings</a></li>
                </ul>
            </div>
            <div class="menu-section">
                <h3>Content</h3>
                <ul>
                    <li><a href="#posts"><span class="icon">📝</span>Posts</a></li>
                    <li><a href="#media"><span class="icon">🖼️</span>Media</a></li>
                    <li><a href="#comments"><span class="icon">💬</span>Comments</a></li>
                </ul>
            </div>
            <div class="menu-section">
                <h3>Advanced</h3>
                <ul>
                    <li><a href="#analytics"><span class="icon">📈</span>Analytics</a></li>
                    <li><a href="#seo"><span class="icon">🔍</span>SEO</a></li>
                    <li><a href="#tools"><span class="icon">🛠️</span>Tools</a></li>
                </ul>
            </div>
            <style>
                .sidebar-menu {
                    padding: 0;
                    width: 100%;
                }
                .menu-section {
                    margin-bottom: 20px;
                    width: 100%;
                }
                .menu-section h3 {
                    color: #666;
                    margin: 0;
                    padding: 15px 20px;
                    font-size: 0.85em;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    background: #f5f5f5;
                }
                .menu-section ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                }
                .menu-section ul li {
                    margin: 0;
                    border-bottom: 1px solid #eee;
                }
                .menu-section ul li:last-child {
                    border-bottom: none;
                }
                .menu-section ul li a {
                    color: #333;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    transition: all 0.2s ease;
                }
                .menu-section ul li a:hover {
                    background: #f8f8f8;
                    padding-left: 25px;
                }
                .menu-section .icon {
                    margin-right: 10px;
                    width: 20px;
                    text-align: center;
                }
            </style>
        </div>
    `,
    position: "left-sidebar",
    stackable: false,
    buttons: []
})
