'use client'
import { useEffect, useState } from 'react'
import socket from '../socket'

export function useOnlineStatus() {
  // initialize from current socket connection state so UI is correct immediately
  const [isOnline, setIsOnline] = useState<boolean>(socket.connected)

  useEffect(() => {
    const handleConnect = () => setIsOnline(true)
    const handleDisconnect = () => setIsOnline(false)
    const handleConnectError = () => setIsOnline(false)
    const handleReconnect = () => setIsOnline(true)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)
    socket.on('reconnect', handleReconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
      socket.off('reconnect', handleReconnect)
    }
  }, [])

  return isOnline
}
