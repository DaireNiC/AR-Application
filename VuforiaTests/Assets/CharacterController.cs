using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityStandardAssets.CrossPlatformInput;

public class CharacterController : MonoBehaviour
{

    private const float speed = .1f;

    private Animator anim;

    // Use this for initialization
    void Start()
    {
        anim = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {

        //move character from joystick input
        float x = CrossPlatformInputManager.GetAxis("Horizontal");
        float y = CrossPlatformInputManager.GetAxis("Vertical");

        if (!x.Equals(0) && !y.Equals(0))
        {
            transform.eulerAngles = new Vector3(transform.eulerAngles.x, Mathf.Atan2(x, y) * Mathf.Rad2Deg, transform.eulerAngles.z);
        }

        if (!x.Equals(0) || !y.Equals(0))
        {
            transform.position += transform.forward * Time.deltaTime * speed;
            anim.SetTrigger("hop");
        }
        else
        {
            anim.SetTrigger("IdleAgitated");
        }
    }

    public void PlaceCharacter()
    {
        transform.localPosition = Vector3.zero;
    }
}
