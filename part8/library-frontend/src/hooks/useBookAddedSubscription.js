import { useSubscription } from '@apollo/client';
import { BOOK_ADDED } from '../graphql/subscriptions';

const useBookAddedSubscription = () => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { bookAdded: book },
      },
    }) => {
      alert(
        `Book "${book.title}" by "${book.author.name}" was added to the library.`
      );
    },
  });
};

export default useBookAddedSubscription;
