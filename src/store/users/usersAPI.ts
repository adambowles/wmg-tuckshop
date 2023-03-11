import { User } from 'store/users/types';

export function fetchUsersFromAPI() {
  return new Promise<{ data: User[] }>((resolve, reject) =>
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        response.json().then((response) => {
          const data = response.data as any[];

          let users = data
            .map((user) => {
              return {
                _id: user._id,
                name: user.name,
                rank: user.rank,
                number: user.number,
              };
            })
            .sort((a: User, b: User) => {
              if (!isNaN(Number(a.number)) && !isNaN(Number(b.number))) {
                return Number(a.number) - Number(b.number);
              }

              return 0;
            });

          resolve({ data: users });
        });
      })
      .catch(reject),
  );
}
