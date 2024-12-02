const SidebarStyles = {
    drawerWidth: 250,

    activeStyle: {
        backgroundColor: '#424345',
        color: '#BDDEFB',
        fontWeight: 500,
    },

    inactiveStyle: {
        backgroundColor: 'transparent',
        color: '#B4B4B4',
        fontWeight: 400,
    },

    gridContainer: (open) => ({
        display: 'grid',
        gridTemplateColumns: open ? `${SidebarStyles.drawerWidth}px auto` : '0px auto',
        gridTemplateRows: '100vh',
        transition: 'grid-template-columns 0.3s ease-in-out',
        width: '100%',
    }),

    drawer: (open) => ({
        width: SidebarStyles.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: SidebarStyles.drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            backgroundColor: '#3A3836',
            color: '#FFFFFF',
            transform: open ? 'translateX(0)' : `translateX(-${SidebarStyles.drawerWidth}px)`,
            transition: 'transform 0.3s ease-in-out',
        },
    }),

    listItemButton: (isActive) => ({
        ...(!isActive ? SidebarStyles.inactiveStyle : SidebarStyles.activeStyle),
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: '#424345',
        },
        transition: 'background-color 0.2s ease-in-out',
    }),

    listItemIcon: (isActive) => ({
        color: isActive ? '#BDDEFB' : '#B4B4B4',
        paddingLeft: '10px',
        fontSize: '20px',
        '&:hover': {
            color: '#FFFFFF',
        },
    }),

    listItemText: (isActive) => ({
        '& .MuiListItemText-primary': {
            fontFamily: 'poppins !important',
            fontWeight: isActive ? 500 : 400,
            color: isActive ? '#BDDEFB' : '#B4B4B4',
            transition: 'font-weight 0.2s ease-in-out, color 0.2s ease-in-out',
        },
        '&:hover .MuiListItemText-primary': {
            color: isActive ? '#BDDEFB' : '#FFFFFF',
        },
    }),

    menuIcon: {
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 1300,
    },
};

export default SidebarStyles;
