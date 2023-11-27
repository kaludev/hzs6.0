import './globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer/Footer';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI Prompts'
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