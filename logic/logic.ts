import { Request, Response } from "express";

export async function Logic(
    req: Request,
    res: Response
  ) {
    try {
      return res.json({data: { hasil: solution(JSON.parse(req.body.data.a), parseInt(req.body.data.m), parseInt(req.body.data.k)) }})
    } catch (error) {
      return res.json({data: { hasil: "Variabel Salah" }})
    }
  }

  function solution(a: number[], m: any, k: any) {
    let hashWindow: any = {};
    let initSwitch: any = false;
    let currentPair: any = [];
  
    for (let i = 0; i < m; i++) {
      if (k - a[i] in hashWindow) {
        currentPair = [a[i], k - a[i]];
        initSwitch = true;
      }
      hashWindow[a[i]] = (hashWindow[a[i]] || 0) + 1;
    }
  
    let counter = 0;
    let toReturn = initSwitch ? 1 : 0;
  
    for (let i = m; i < a.length; i++) {
      hashWindow[a[counter]] -= 1;
      if (hashWindow[a[counter]] === 0) {
        delete hashWindow[a[counter]];
      }
      if (k - a[i] in hashWindow) {
        currentPair = [a[i], k - a[i]];
        toReturn += 1;
      } else if (
        currentPair.length > 1 &&
        currentPair[0] !== currentPair[1] &&
        currentPair[0] in hashWindow &&
        currentPair[1] in hashWindow
      ) {
        toReturn += 1;
      } else if (
        currentPair.length > 1 &&
        currentPair[0] === currentPair[1] &&
        hashWindow[currentPair[0]] >= 2
      ) {
        toReturn += 1;
      }
      hashWindow[a[i]] = (hashWindow[a[i]] || 0) + 1;
      counter += 1;
    }
  
    return toReturn;
  }
  