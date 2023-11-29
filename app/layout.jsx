import '@styles/globals.css';

import Nav from '@components/Nav/Nav';
import SideNav from '@components/SideNav/SideNav'
import Provider from '@components/Provider';
import Footer from '@components/Footer/Footer';
import ToastProvider from '@components/ToastProvider';

export const metadata = {
    title: 'Hakaton Arena',
    description: 'Rezerviši svoju arenu odmah!'
};
const RootLayout = ({ children }) => {
  return (
        <html lang="en">
            <body>
                <Provider>
                    <ToastProvider>
                        <main className='app'>
                            <Nav />
                            <SideNav />
                            {children}
                            <Footer />
                        </main>
                    </ToastProvider>
                </Provider>
                
            </body>
        </html>
  )
}

export default RootLayout