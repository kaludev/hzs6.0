import './globals.css';

import Nav from '@components/Nav/Nav';
import Provider from '@components/Provider';

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
                    </main>
                </Provider>
            </body>
        </html>
  )
}

export default RootLayout