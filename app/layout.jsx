import '@styles/globals.css';

import Nav from '@components/Nav/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer/Footer';

export const metadata = {
    title: 'Higher Lower game',
    description: 'Play our higher lower game'
};
const RootLayout = ({ children }) => {
  return (
        <html lang="en">
            <body>
                <Provider>
                    <main className='app'>
                        <Nav />
                        {children}
                        <Footer />
                    </main>
                </Provider>
            </body>
        </html>
  )
}

export default RootLayout