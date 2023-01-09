import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './Home/Index'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

export default App
