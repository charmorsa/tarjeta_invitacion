import jwt from 'jsonwebtoken';

export const generateJWT = (user: any) => {
    return new Promise((res, rej) => {
        jwt.sign({id: user._id, name: user.name, last_name: user.last_name, admin: user.admin }, "%i7PchH4ka3Lf%2h&A*PK@$qLG*^Ç¨ç´213`+2+t´çñfç´FN7AqzXC^R5q#Qt8jJqVXvcI@Kuo5C4^g4mT2Kt#Wyu%H4$", { expiresIn: '24h', algorithm: 'HS256' }, (err, token) => {
            if (err) return rej('Token Not Generated'); else return res(token)
        })
    })
}