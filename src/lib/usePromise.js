import { useState, useEffect } from 'react';

// promise를 생성하는 promiseCreator
// 언제 promise를 새로 만들지에 대한 조건을 위한 deps배열을 파라미터로 받아온다
// 이 deps 배열은 useEffect의 두 번째 파라미터로 전달되며,
// 기본값은 비어있는 배열!
export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 따른 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}
