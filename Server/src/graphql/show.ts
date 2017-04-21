import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';

import * as rp from 'request-promise';

import episodeType from './episode';
import castType from './cast';

export default new GraphQLObjectType({
    name: 'Show',
    fields: {
        id: {
            type: GraphQLInt
        },
        url: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        language: {
            type: GraphQLString
        },
        genres: {
            type: new GraphQLList(GraphQLString)
        },
        status: {
            type: GraphQLString
        },
        airstamp: {
            type: GraphQLString
        },
        runtime: {
            type: GraphQLInt
        },
        premiered: {
            type: GraphQLString
        },
        weight: {
            type: GraphQLInt
        },
        summary: {
            type: GraphQLString
        },
        updated: {
            type: GraphQLInt
        },
        image: {
            type: GraphQLString,
            resolve: (root) => {
                if (root.image) {
                    return root.image.original;
                }

                return null;
            }
        },
        network: {
            type: GraphQLString,
            resolve: (root) => {
                if (root.network) {
                    return root.network.name;
                }

                return null;
            }
        },
        episodes: {
            type: new GraphQLList(episodeType),
            resolve: (root) => {
                return rp(`http://api.tvmaze.com/shows/${root.id}/episodes`)
                    .then((res) => JSON.parse(res));
            }
        },
        cast: {
            type: new GraphQLList(castType),
            resolve: (root) => {
                return rp(`http://api.tvmaze.com/shows/${root.id}/cast`)
                    .then((res) => {
                        return JSON.parse(res)
                    });
            }
        }
    }
});
